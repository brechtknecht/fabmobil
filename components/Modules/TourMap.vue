<template>
  <div class="relative w-full h-full flex flex-row">
    <div id="map" class="relative w-full"></div>

    <!-- The list component -->
    <div class="relative h-[100%] overflow-y-scroll w-[20%] top-0 hidden">
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
  <!-- <pre class="text-black">{{ data }}</pre> -->
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

// Declare a variable to store the interval ID
let intervalId = null

const data = toRef(props, 'tourData')

watch(data, (newVal, oldVal) => {
  console.log('tourData changed:', newVal)
})

console.log('DATA', data)

const map = ref(null)
const viewingDetail = ref(null)
const addedLayers = []

const resetZoom = () => {
  map.value.flyTo({
    center: [12.8, 51.1],
    zoom: 7.4,
  })
}

const generateTourPath = (waviness = 2, granularity = 50) => {
  // Get the coordinates of Dresden.
  const dresdenCoordinates = [13.737262, 51.050407]
  let currentPoint = dresdenCoordinates

  // Create an array to hold the coordinates of the tour path.
  let tourPathCoordinates = [dresdenCoordinates]

  // Iterate over the tour data and add each location to the tour path.
  data.value.forEach((item, index) => {
    const destinationCoordinates = [
      Number(item.location.lon),
      Number(item.location.lat),
    ]

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

const setupMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYnJlY2h0a25lY2h0IiwiYSI6ImNqZ2lkOHM1MDBidGkyeW84aXJwbmc2ZWoifQ.C4Qv0LupRWQ2b1ZamWqqUA'

  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth
  let zoom
  if (viewportWidth <= 780) {
    // This is typically the width of a mobile device
    zoom = 6 // Adjust this to your preferred zoom level on mobile devices
  } else {
    zoom = 8 // Adjust this to your preferred zoom level on larger devices
  }

  const bounds = [
    [6.5, 49.0], // Southwest coordinates (near Saarbrücken)
    [17, 54.8], // Adjusted Northeast coordinates (more to the east
  ]

  const centerOfSaxony = [13.5, 51.0]

  map.value = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/brechtknecht/clhht1rwd01h701pg3wx56t1f',
    style: 'mapbox://styles/brechtknecht/clk34rcwj003701nwf90f672o/draft',
    zoom: zoom,
    center: centerOfSaxony, // Coordinates for Dresden
    //  maxBounds: bounds, // Set the map's geographical boundaries.
    // pitch: 33,
    antialias: true,
    maxZoom: 9,
    cooperativeGestures: true,
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
        'line-width': 3,
        'line-color': '#312F34', // Change this to the desired color of the line.
      },
    })

    // Then set up an interval to gradually add more points to the line.
    let currentIndex = 1
    const pointsToAddPerInterval = 5 // Adjust this value to add more points per interval
    // Calculate the interval duration based on the number of points
    const numPoints = tourPath.geometry.coordinates.length
    const totalAnimationDuration = 1000 // Total duration of the animation in milliseconds
    const intervalDuration = totalAnimationDuration / numPoints // Interval duration

    // Clear the previous interval if it exists
    if (intervalId) {
      clearInterval(intervalId)
    }

    intervalId = setInterval(() => {
      if (currentIndex < tourPath.geometry.coordinates.length) {
        const currentData = map.value.getSource('tour-path')._data
        currentData.geometry.coordinates.push(
          tourPath.geometry.coordinates[currentIndex]
        )
        currentIndex++
        map.value.getSource('tour-path').setData(currentData)
      } else {
        clearInterval(intervalId) // Stop the interval once we've added all the points.
      }
    }, intervalDuration) // Use the calculated interval duration
  })

  // map.value.scrollZoom.disable()

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
      const sortedOrigins = modelOrigins.sort(
        (a, b) => a.startdate.getTime() - b.startdate.getTime()
      )

      const geoJsonData = {
        type: 'FeatureCollection',
        features: sortedOrigins.map((origin) => ({
          type: 'Feature',
          properties: {
            city: origin.city,
            startDate: origin.startdate,
            endDate: origin.enddate,
            school: origin.venuename,
            category: origin.category,
            isLokallabor: origin.category.includes('Lokallabor') ? 1 : 0, // Add new property
          },
          geometry: {
            type: 'Point',
            coordinates: origin.coordinates,
          },
        })),
      }

      map.value.on('load', () => {
        // Add the cluster source
        map.value.addSource('cities', {
          type: 'geojson',
          data: geoJsonData,
          cluster: true,
          clusterMaxZoom: 7,
          clusterRadius: 50,
        })

        // Cluster layer
        map.value.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'cities',
          filter: ['has', 'point_count'],
          paint: {
            'circle-stroke-width': 2, // Increase the stroke width for a larger visual circle
            'circle-stroke-color': '#fff',
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#6E31F0',
              100,
              '#6E31F0',
              750,
              '#f28cb1',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        })

        // Cluster count layer
        map.value.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'cities',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
          paint: {
            'text-color': '#FFFFFF', // Set the text color to white
          },
        })

        // Unclustered point layer
        // Unclustered point layer with a bigger circle radius and stroke width
        map.value.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'cities',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'match',
              ['get', 'isLokallabor'],
              1,
              '#FF6700', // replace with the color for 'Lokallabor'
              '#6E31F0', // existing color
            ],
            'circle-radius': 5,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
          },
        })

        map.value.addLayer({
          id: 'unclustered-point-hit-area',
          type: 'circle',
          source: 'cities',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': 15, // Increase the radius for a larger hitbox
            'circle-opacity': 0, // Make the circle invisible
          },
        })

        // Add a layer for the city names (unclustered)
        map.value.addLayer({
          id: 'unclustered-point-label',
          type: 'symbol',
          source: 'cities',
          filter: ['!', ['has', 'point_count']],
          layout: {
            'text-field': ['get', 'city'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.5],
            'text-anchor': 'top',
          },
          paint: {
            'text-color': '#FFFFFF', // Set the text color to white
          },
        })

        // Inspect a cluster on click
        map.value.on('click', 'clusters', (e) => {
          const features = map.value.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          })
          const clusterId = features[0].properties.cluster_id
          map.value
            .getSource('cities')
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return

              map.value.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              })
            })
        })

        let popup

        function handleMouseOver(e) {
          const coordinates = e.features[0].geometry.coordinates.slice()
          const city = e.features[0].properties.city
          const startDate = new Date(
            e.features[0].properties.startDate
          ).toLocaleDateString('de-DE')

          const endDate = new Date(
            e.features[0].properties.endDate
          ).toLocaleDateString('de-DE')
          const school = e.features[0].properties.school
          const category = e.features[0].properties.category

          let dateHTML = ''

          if (startDate == 'Invalid Date') {
            dateHTML = ''
          } else {
            dateHTML = `<p class="font-body text-xl text-black">${startDate}${
              endDate ? ' — ' + endDate : ''
            }</p>`
          }

          popup = new mapboxgl.Popup({
            closeOnClick: false,
            closeButton: false,
          })
            .setLngLat(coordinates)
            .setHTML(
              `<h1 class="font-headline text-xl text-black">${category}</h1>
              <p class="font-body text-xl text-black">${school}</p>
              ${dateHTML}
              `
            )
            .addTo(map.value)
        }

        function handleMouseLeave() {
          if (popup) {
            popup.remove()
          }
        }

        const isTouchDevice =
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0

        if (isTouchDevice) {
          map.value.on(
            'touchstart',
            'unclustered-point-hit-area',
            handleMouseOver
          )
        } else {
          map.value.on(
            'mouseover',
            'unclustered-point-hit-area',
            handleMouseOver
          )
          map.value.on(
            'mouseleave',
            'unclustered-point-hit-area',
            handleMouseLeave
          )
        }

        // Cursor pointer on clusters
        map.value.on('mouseenter', 'clusters', () => {
          map.value.getCanvas().style.cursor = 'pointer'
        })
        map.value.on('mouseleave', 'clusters', () => {
          map.value.getCanvas().style.cursor = ''
        })
      })
    })
    .catch((error) => {
      console.error('An error occurred while loading the models:', error)
    })
}

// Watch tourData and update the map when it changes
watch(data, (newVal, oldVal) => {
  // Generate the new tour path
  const newTourPath = generateTourPath(newVal)

  // Update the map with the new tour path
  setupMap(newTourPath)
})

// Call setupMap in onMounted to set up the map when the component is first created
onMounted(() => {
  setupMap(data.value)
})

onBeforeUnmount(() => {
  // Clear the interval
  if (intervalId) {
    clearInterval(intervalId)
  }

  // Remove the map
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})

const handleGoToCoordinate = (coord, cityData) => {
  const coordinates = [
    parseFloat(cityData.location.lon.toFixed(8)),
    parseFloat(cityData.location.lat.toFixed(8)),
  ]

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
