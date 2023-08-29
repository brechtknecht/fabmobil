<template>
  <div class="floating-images-wrapper">
    <div
      class="floating-images"
      :style="{ '--background-color': backgroundcolor }"
      @mousemove="handleMouseMove"
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
      default: 0.000000001,
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
    }
  },
  mounted() {
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

    // Add keydown and keyup event listeners
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeUnmount() {
    // Remove event listeners when component is unmounted
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    initImages() {
      const numberOfImages = 6
      // Prepare a temporary array with image sizes
      const tempImages = Array.from({ length: numberOfImages }, (_, i) => {
        const size = (Math.random() * 100 + 50) * this.scale
        return { id: i, size }
      })

      // Sort the temporary images array by size (largest to smallest)
      tempImages.sort((a, b) => b.size - a.size)

      // Divide the screen into grid
      const rows = 5
      const cols = 5
      const cellWidth = this.screenWidth / cols
      const cellHeight = this.screenHeight / rows

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
      for (let i = 0; i < numberOfImages; i++) {
        const cell = cells[i]

        // Compute the position based on the cell, with optional offset within the cell
        const offsetX = cellWidth * 0.1
        const offsetY = cellHeight * 0.1
        const x = cell.col * cellWidth + offsetX
        const y = cell.row * cellHeight + offsetY

        const size = tempImages[i].size // Get size from sorted tempImages array

        const url = `/assets/img/background-items/${String(i + 1).padStart(
          2,
          '0'
        )}.png`

        this.images.push({
          id: tempImages[i].id, // Get id from sorted tempImages array
          url: url,
          style: `left:${x}px;top:${y}px;width:${size}px;`,
          x,
          y,
          size,
        })
      }

      this.animateImages()
    },
    handleMouseMove(event) {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
    },
    handleKeyDown(event) {
      if (event.key === 'f') {
        this.$emit('update:speed', 100)
      }
    },
    handleKeyUp(event) {
      if (event.key === 'f') {
        this.$emit('update:speed', 0.000001)
      }
    },
    animateImages() {
      requestAnimationFrame(this.animateImages)

      this.images.forEach((image, index) => {
        // Calculate parallax shift based on mouse position relative to the center
        const shiftX =
          (this.mouseX - this.screenWidth / 2) * (image.size * 0.000001)
        const shiftY =
          (this.mouseY - this.screenHeight / 2) * (image.size * 0.000001)

        let x = image.x + this.speed + image.size * 0.0002 + shiftX // Move right with parallax effect
        let y = image.y + shiftY

        // Respawn logic for all edges
        if (x < -image.size) x = this.screenWidth + Math.random() * 300
        if (x > this.screenWidth) x = -image.size
        if (y < -image.size) y = this.screenHeight
        if (y > this.screenHeight) y = -image.size

        this.images[
          index
        ].style = `left:${x}px;top:${y}px;width:${image.size}px;`
        this.images[index].x = x
        this.images[index].y = y
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.floating-image {
  position: absolute;
  mix-blend-mode: overlay;
  z-index: -1;
  img {
    mix-blend-mode: overlay;
    opacity: 0.3;
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
  background: var(--background-color);
  z-index: -10;
}

.floating-images::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  mask-image: radial-gradient(
    circle at center,
    transparent 10%,
    var(--background-color) 100%
  );
  mask-size: 100% 100%;
  background-color: var(--background-color);
  pointer-events: none; /* So it doesn't interfere with mouse events */
  z-index: 12; /* Make sure it's above the images */
}
.slot-content {
  position: relative;
  z-index: 13; /* Higher z-index to appear above the gradient */
}
</style>
