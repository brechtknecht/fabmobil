<template>
  <div class="relative w-full h-full">
    <div id="map"></div>
    <modules-tour-map-u-i
      @go-to-coordinate="handleGoToCoordinate"
      @reset-zoom="resetZoom"
    ></modules-tour-map-u-i>
  </div>
</template>

<script setup>
import { defineEmits, onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { toRaw } from 'vue'

const data = [
  {
    city: 'Dresden',
    coordinates: [13.73, 51.05],
    date: new Date(),
  },
  {
    city: 'Chemnitz',
    coordinates: [12.92, 50.83],
    date: new Date(),
  },
]

const map = ref(null)
const emit = defineEmits(['animation-year-updated'])
const addedLayers = []

const generateRandomDate = (year) => {
  return new Date(
    year,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28)
  )
}

const resetZoom = () => {
  map.value.flyTo({
    center: [13.7, 51.1],
    zoom: 8,
  })
}

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYnJlY2h0a25lY2h0IiwiYSI6ImNqZ2lkOHM1MDBidGkyeW84aXJwbmc2ZWoifQ.C4Qv0LupRWQ2b1ZamWqqUA'

  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/brechtknecht/clhht1rwd01h701pg3wx56t1f',
    zoom: 8,
    center: [13.7, 51.1],
    pitch: 33,
    antialias: true,
  })

  map.value.scrollZoom.disable()

  const modelOrigins = data

  const modelAltitude = 0
  const modelRotate = [Math.PI / 2, 45, 0]
  const scale = 2000
  const totalAnimationDuration = 6000 // Total duration of all animations

  const modelLoadPromises = modelOrigins.map((modelOrigin, index) => {
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin.coordinates,
      modelAltitude
    )

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * scale,
    }

    const customLayer = {
      id: '3d-model-' + index,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera()
        this.scene = new THREE.Scene()

        const directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.position.set(0, -70, 100).normalize()
        this.scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff)
        directionalLight2.position.set(0, 70, 100).normalize()
        this.scene.add(directionalLight2)

        const loader = new GLTFLoader()
        const loaderPromise = new Promise((resolve, reject) => {
          loader.load(
            'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf',
            (gltf) => {
              this.scene.add(gltf.scene)
              resolve(this)
            },
            undefined,
            (error) => {
              reject(error)
            }
          )
        })

        this.map = map
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        })

        this.renderer.autoClear = false

        return loaderPromise
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        )
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        )
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        )

        const m = new THREE.Matrix4().fromArray(matrix)
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ)

        this.camera.projectionMatrix = m.multiply(l)
        this.renderer.resetState()
        this.renderer.render(toRaw(this.scene), toRaw(this.camera))
        this.map.triggerRepaint()
      },
    }

    return customLayer
  })

  Promise.all(modelLoadPromises)
    .then((customLayers) => {
      // Sort modelOrigins by date, not customLayers.
      const sortedOrigins = modelOrigins.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )
      map.value.on('styledata', function () {
        sortedOrigins.forEach((modelOrigin, index) => {
          const customLayer = customLayers[index]
          const layerId = '3d-model-' + index
          if (!map.value.getLayer(layerId) && !addedLayers.includes(layerId)) {
            // Check if the layer already exists or is in the process of being added.
            addedLayers.push(layerId) // Add to the record of layers being added
            setTimeout(() => {
              map.value.addLayer(customLayer)
              emit('animation-year-updated', modelOrigin.date.getFullYear())
            }, (totalAnimationDuration / sortedOrigins.length) * index)
          }
        })
      })

      modelOrigins.forEach((modelOrigin, index) => {
        map.value.on('load', () => {
          map.value.addSource('point' + index, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: modelOrigin.coordinates,
              },
            },
          })
          map.value.addLayer({
            id: 'point' + index,
            type: 'symbol',
            source: 'point' + index,
            layout: {
              'text-field': modelOrigin.city,
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'center',
            },
          })
        })
      })
    })
    .catch((error) => {
      console.error('An error occurred while loading the models:', error)
    })
})

const handleGoToCoordinate = (coord) => {
  map.value.flyTo({
    center: coord,
    zoom: 10,
  })
}
</script>

<style scoped>
#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
