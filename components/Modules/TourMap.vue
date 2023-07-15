<template>
  <div class="relative w-full h-full flex flex-row">
    <div id="map" class="relative w-[80%]"></div>

    <!-- The list component -->
    <div class="relative h-[100%] overflow-y-scroll w-[20%] top-0">
      <transition name="slide" mode="out-in">
        <div v-if="!viewingDetail">
          <modules-tour-map-u-i
            class="h-full"
            :city-data-list="data"
            @go-to-coordinate="handleGoToCoordinate"
            @reset-zoom="resetZoom"
          />
        </div>
      </transition>

      <!-- The detail view component -->
      <transition name="slide" mode="in-out">
        <modules-tour-map-detail
          v-if="viewingDetail"
          class="h-full"
          :detail="viewingDetail"
          @go-back="handleBack"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, onBeforeUnmount, onMounted, ref, toRef } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { toRaw } from 'vue'

import { defineProps } from 'vue'
const props = defineProps({
  tourData: {
    type: Array,
    default: () => [],
  },
})

const data = toRef(props, 'tourData')

console.log('DATA', data)

const map = ref(null)
const viewingDetail = ref(null)
const emit = defineEmits(['animation-year-updated'])
const addedLayers = []

const resetZoom = () => {
  map.value.flyTo({
    center: [13.7, 51.1],
    zoom: 7.4,
  })
}

const generateTourPath = (waviness = 2, granularity = 50) => {
  // Get the coordinates of Dresden.
  const dresdenCoordinates = [13.7, 51.1]
  let currentPoint = dresdenCoordinates

  // Create an array to hold the coordinates of the tour path.
  let tourPathCoordinates = [dresdenCoordinates]

  // Iterate over the tour data and add each location to the tour path.
  data.value.forEach((item, index) => {
    const destinationCoordinates = [item.location.lon, item.location.lat]

    // Generate the path from current point to destination
    const pathSegmentCoordinates = generateSplinePath(
      currentPoint,
      destinationCoordinates,
      waviness,
      granularity
    )
    tourPathCoordinates = tourPathCoordinates.concat(pathSegmentCoordinates)

    // Update current point to the destination
    currentPoint = destinationCoordinates

    // After each location, there's a 20% chance to return to Dresden before moving on to the next location.
    if (Math.random() < 0.4 && index < data.value.length - 1) {
      const pathBackToDresden = generateSplinePath(
        currentPoint,
        dresdenCoordinates,
        waviness,
        granularity
      )
      tourPathCoordinates = tourPathCoordinates.concat(pathBackToDresden)
      currentPoint = dresdenCoordinates // Update current point back to Dresden
    }
  })

  // Always return to Dresden after the last location.
  if (
    currentPoint[0] !== dresdenCoordinates[0] ||
    currentPoint[1] !== dresdenCoordinates[1]
  ) {
    const pathBackToDresden = generateSplinePath(
      currentPoint,
      dresdenCoordinates,
      waviness,
      granularity
    )
    tourPathCoordinates = tourPathCoordinates.concat(pathBackToDresden)
  }

  // Create a LineString geometry representing the tour path.
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: tourPathCoordinates,
    },
  }
}

function generateSplinePath(
  start,
  end,
  curviness = 2,
  granularity = 50,
  variance = 0.2
) {
  // Generate multiple control points for the spline.
  const controlPoints = []

  // Define how many additional control points we want
  const additionalPoints = 3

  // For each additional point, calculate its position
  for (let i = 1; i <= additionalPoints; i++) {
    const t = i / (additionalPoints + 1)
    const midPointX = (1 - t) * start[0] + t * end[0]
    const midPointY = (1 - t) * start[1] + t * end[1]

    const controlPoint = [
      midPointX -
        (midPointX - start[0]) / curviness +
        (Math.random() - 0.5) * variance,
      midPointY + (Math.random() - 0.5) * variance,
    ]

    controlPoints.push(new THREE.Vector2(...controlPoint))
  }

  // Create the spline.
  const spline = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector2(...start),
      ...controlPoints,
      new THREE.Vector2(...end),
    ].map((point) => new THREE.Vector3(point.x, point.y, 0)),
    false,
    'centripetal'
  )

  // Generate the points along the spline.
  const points = spline
    .getPoints(granularity)
    .map((point) => [point.x, point.y])

  // Return the points.
  return points
}

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYnJlY2h0a25lY2h0IiwiYSI6ImNqZ2lkOHM1MDBidGkyeW84aXJwbmc2ZWoifQ.C4Qv0LupRWQ2b1ZamWqqUA'

  map.value = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/brechtknecht/clhht1rwd01h701pg3wx56t1f',
    style: 'mapbox://styles/brechtknecht/clk34rcwj003701nwf90f672o/draft',
    zoom: 7.4,
    center: [13.7, 51.1],
    pitch: 33,
    antialias: true,
  })

  // Create the tour path and add it to the map as a GeoJSON source and a line layer.
  const tourPath = generateTourPath()

  map.value.on('load', () => {
    map.value.addSource('tour-path', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [tourPath.geometry.coordinates[0]], // Start with only the first coordinate.
        },
      },
    })

    map.value.addLayer({
      id: 'tour-path',
      type: 'line',
      source: 'tour-path',
      paint: {
        'line-width': 4,
        'line-color': '#00FF00', // Change this to the desired color of the line.
      },
    })

    // Then set up an interval to gradually add more points to the line.
    let currentIndex = 1
    const pointsToAddPerInterval = 5 // Adjust this value to add more points per interval
    const intervalDuration =
      totalAnimationDuration / tourPath.geometry.coordinates.length

    const intervalId = setInterval(() => {
      if (currentIndex < tourPath.geometry.coordinates.length) {
        const currentData = map.value.getSource('tour-path')._data
        for (
          let i = 0;
          i < pointsToAddPerInterval &&
          currentIndex < tourPath.geometry.coordinates.length;
          i++
        ) {
          currentData.geometry.coordinates.push(
            tourPath.geometry.coordinates[currentIndex]
          )
          currentIndex++
        }
        map.value.getSource('tour-path').setData(currentData)
      } else {
        clearInterval(intervalId) // Stop the interval once we've added all the points.
      }
    }, intervalDuration) // Keep the interval at 1 ms
  })

  map.value.scrollZoom.disable()

  const modelOrigins = data.value.map((item) => ({
    city: item.location.city,
    coordinates: [item.location.lon, item.location.lat],
    startdate: new Date(item.startdate),
    enddate: new Date(item.enddate),
    venuename: item.venuename,
    category: item.category,
  }))

  const modelAltitude = 0
  const modelRotate = [Math.PI / 2, 45, 0]
  const scale = 20000
  const totalAnimationDuration = 30000 // Total duration of all animations

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

        const textureLoader = new THREE.TextureLoader()
        const loaderPromise = new Promise((resolve, reject) => {
          textureLoader.load(
            '/assets/img/bus.png',
            (texture) => {
              const material = new THREE.SpriteMaterial({ map: texture })
              const sprite = new THREE.Sprite(material)
              this.scene.add(sprite)
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
          new THREE.Vector3(0, 0, 0),
          modelTransform.rotateY
        )
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 0),
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
        // .multiply(rotationX)
        // .multiply(rotationY)
        // .multiply(rotationZ)

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
        (a, b) => a.startdate.getTime() - b.startdate.getTime()
      )

      // Load the image into Mapbox
      map.value.loadImage(
        '/assets/img/bus.png', // Replace with the URL or relative path of your image file
        function (error, image) {
          if (error) throw error
          map.value.addImage('custom-marker', image)

          sortedOrigins.forEach((modelOrigin, index) => {
            map.value.on('load', () => {
              const pointSource = 'point' + index
              const imageSource = 'image' + index

              // Add the text layer
              map.value.addSource(pointSource, {
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
                id: pointSource,
                type: 'symbol',
                source: pointSource,
                layout: {
                  'text-field': modelOrigin.city,
                  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                  'text-offset': [0, 3],
                  'text-anchor': 'center',
                  'text-allow-overlap': true,
                },
                paint: {
                  'text-color': '#FFFFFF', // Here you can set the color you want
                },
              })

              // Add the image layer
              map.value.addSource(imageSource, {
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
                id: imageSource,
                type: 'symbol',
                source: imageSource,
                layout: {
                  'icon-image': 'custom-marker', // Reference the image we loaded earlier
                  'icon-size': 0.12, // You can adjust the size of the image here
                  'icon-offset': [0, 0], // You can adjust the position of the image here
                  'icon-allow-overlap': true,
                },
              })
            })
          })
        }
      )
    })
    .catch((error) => {
      console.error('An error occurred while loading the models:', error)
    })
})

const handleGoToCoordinate = (coord, cityData) => {
  const coordinates = [cityData.location.lon, cityData.location.lat]

  map.value.flyTo({
    center: coordinates,
    zoom: 10,
  })

  viewingDetail.value = cityData
}

const handleBack = () => {
  viewingDetail.value = null
  resetZoom()
}

watch(viewingDetail, (newVal) => {
  if (newVal) {
    handleGoToCoordinate(newVal.coordinates, newVal)
  } else {
    resetZoom()
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
