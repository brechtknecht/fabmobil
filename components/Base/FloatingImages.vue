<template>
  <div class="floating-images-wrapper">
    <div
      class="floating-images"
      :style="{ '--background-color': backgroundcolor }"
    >
      <div
        v-for="image in images"
        :key="image.id"
        :style="image.style"
        class="floating-image"
      >
        <img :src="image.url" alt="Floating Image" />
      </div>
      <div class="slot-content">
        <!-- Wrapper for slot with higher z-index -->
        <slot></slot>
        <!-- Slot to insert any content -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 0.000001,
    },
    mouseEffectIntensity: {
      type: Number,
      default: 0.000001,
    },
    scale: {
      type: Number,
      default: 1,
    },
    backgroundcolor: {
      type: String,
      default: '#000000',
    },
  },
  data() {
    return {
      images: [],
      mouseX: 0,
      mouseY: 0,
      screenWidth: 0,
      screenHeight: 0,
      componentWidth: 0,
      componentHeight: 0,
      trottle: false,
      animationFrameId: null,
      timeoutId: null,
      lastMoveTime: 0,
    }
  },
  mounted() {
    const rect = this.$el.getBoundingClientRect()
    this.componentWidth = rect.width
    this.componentHeight = rect.height
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
    this.mouseX = this.screenWidth / 2
    this.mouseY = this.screenHeight / 2
    this.initImages()

    // Set the CSS variable
    document.documentElement.style.setProperty(
      '--background-color',
      this.backgroundcolor
    )

    window.addEventListener('mousemove', this.throttledMouseMove, {
      passive: true,
    })
  },
  beforeUnmount() {
    // Remove event listeners
    window.removeEventListener('mousemove', this.throttledMouseMove)

    // Cancel any ongoing animations
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }

    // Clear any timeouts
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  },
  methods: {
    initImages() {
      const numberOfImages = 16
      const numberOfImagesToUse = 14 // Number of images to use

      // Prepare a temporary array with image sizes
      const tempImages = Array.from({ length: numberOfImages }, (_, i) => {
        const size = (Math.random() * 100 + 50) * this.scale
        return { id: i, size }
      })

      // Sort the temporary images array by size (largest to smallest)
      tempImages.sort((a, b) => b.size - a.size)

      // Randomly select 5 images from the sorted array
      const selectedImages = []
      const indices = Array.from({ length: numberOfImages }, (_, i) => i)
      while (selectedImages.length < numberOfImagesToUse) {
        const randomIndex = Math.floor(Math.random() * indices.length)
        const index = indices.splice(randomIndex, 1)[0]
        selectedImages.push(tempImages[index])
      }

      // Divide the screen into grid
      const rows = 5
      const cols = 5

      const cellWidth = this.componentWidth / cols
      const cellHeight = this.componentHeight / rows

      // Create an array of all cells
      const cells = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          cells.push({ row, col })
        }
      }

      // Shuffle the cells array to randomize the order
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[cells[i], cells[j]] = [cells[j], cells[i]] // Swap
      }

      // Place each image in a cell from the shuffled array
      for (let i = 0; i < numberOfImagesToUse; i++) {
        const cell = cells[i]

        // Compute the position based on the cell, with optional offset within the cell
        const offsetX = cellWidth * 0.1
        const offsetY = cellHeight * 0.1
        const x = cell.col * cellWidth + offsetX
        const y = cell.row * cellHeight + offsetY

        const size = selectedImages[i].size // Get size from sorted selectedImages array

        const url = `/assets/img/background-items/${String(i + 1).padStart(
          2,
          '0'
        )}.png`

        this.images.push({
          id: selectedImages[i].id, // Get id from sorted selectedImages array
          url: url,
          style: `left:${x}px;top:${y}px;width:${size}px;`,
          x,
          y,
          size,
        })
      }

      this.animateImages()
    },

    throttledMouseMove(event) {
      const now = Date.now()
      if (now - this.lastMoveTime > 200) {
        this.handleMouseMove(event)
        this.lastMoveTime = now
      }
    },

    handleMouseMove(event) {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
      // Instead of updating the UI here, we just update the state.
      // The actual UI (DOM) update will happen in the animation loop.
    },

    animateImages() {
      const halfScreenWidth = this.screenWidth / 2
      const halfScreenHeight = this.screenHeight / 2

      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i]

        // Calculate parallax shift based on mouse position relative to the center
        const shiftX = (this.mouseX - halfScreenWidth) * (image.size * 0.000001)
        const shiftY =
          (this.mouseY - halfScreenHeight) * (image.size * 0.000001)

        let x = image.x + this.speed + image.size * 0.0002 + shiftX // Move right with parallax effect
        let y = image.y + shiftY

        // Respawn logic for all edges
        if (x < -image.size) x = this.componentWidth + Math.random() * 300
        if (x > this.componentWidth) x = -image.size
        if (y < -image.size) y = this.componentHeight
        if (y > this.componentHeight) y = -image.size

        image.x = x
        image.y = y
        image.style = `transform: translate(${x}px, ${y}px); width:${image.size}px;`
      }

      this.animationFrameId = requestAnimationFrame(this.animateImages)
    },
  },
}
</script>

<style lang="scss" scoped>
.floating-image {
  position: absolute;
  z-index: -1;
  img {
    opacity: 0.2;
  }
}

.floating-images {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}

.floating-images-wrapper:before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -10;
}

.floating-images::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none; /* So it doesn't interfere with mouse events */
  z-index: 12; /* Make sure it's above the images */
}
.slot-content {
  position: relative;
  z-index: 13; /* Higher z-index to appear above the gradient */
}
</style>
