<template>
  <div class="floating-images" @mousemove="handleMouseMove">
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
  },
  methods: {
    initImages() {
      const numberOfImages = 5
      // Divide the screen into grid
      const rows = 5 // Number of rows
      const cols = 5 // Number of columns
      const cellWidth = this.screenWidth / cols
      const cellHeight = this.screenHeight / rows

      // Create an array to track selected cells
      const selectedCells = []

      for (let i = 0; i < numberOfImages; i++) {
        // Find a unique random cell
        let cell
        do {
          cell = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
          }
        } while (
          selectedCells.some(
            (selectedCell) =>
              selectedCell.row === cell.row && selectedCell.col === cell.col
          )
        )

        selectedCells.push(cell)

        // Compute the position based on the cell, with a random offset within the cell
        const x = cell.col * cellWidth + Math.random() * cellWidth
        const y = cell.row * cellHeight + Math.random() * cellHeight

        const size = (Math.random() * 100 + 50) * this.scale // Apply scale factor

        const url = `/assets/img/background-items/${String(i + 1).padStart(
          2,
          '0'
        )}.png`

        this.images.push({
          id: i,
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

<style scoped>
.floating-image {
  position: absolute;
  mix-blend-mode: overlay;
}

.floating-images {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.floating-images::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: radial-gradient(circle at center, transparent 10%, #ddbbfc);
  pointer-events: none; /* So it doesn't interfere with mouse events */
  z-index: 1; /* Make sure it's above the images */
}
.slot-content {
  position: relative;
  z-index: 2; /* Higher z-index to appear above the gradient */
}
</style>
