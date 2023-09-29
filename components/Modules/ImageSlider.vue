<template>
  <div ref="wrapper" :class="wrapperClass" :style="wrapperStyle">
    <div class="inner">
      <div ref="overflow" class="overflow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'HorizontalSlides',
  setup() {
    const wrapper = ref(null)
    const overflow = ref(null)
    const { width: windowWidth } = useWindowSize()

    let lastScrollY

    const update = () => {
      if (process.client) {
        const scrollY = window.scrollY
        if (scrollY !== lastScrollY) {
          handleScroll(scrollY)
          lastScrollY = scrollY
        }
        requestAnimationFrame(update)
      }
    }

    const wrapperClass = computed(() => ({
      wrapper: true,
      'h-screen': true,
    }))

    const totalImagesWidth = computed(() => {
      if (!overflow.value) return 0
      return Array.from(overflow.value.children).reduce((totalWidth, child) => {
        const rect = child.getBoundingClientRect()
        return totalWidth + rect.width
      }, 0)
    })

    // Adjust the wrapperStyle computed property to set the height of the wrapper
    // based on the total width of the images and the width of the window.
    // Adjust the wrapperStyle computed property to set the height of the wrapper
    // based on the total width of the images and the width of the window.
    const wrapperStyle = computed(() => {
      if (overflow.value && totalImagesWidth.value && windowWidth.value) {
        // Assuming the horizontal scroll should match the vertical scroll 1:1
        const height =
          (totalImagesWidth.value / windowWidth.value) * window.innerHeight
        return { height: `${height}px` }
      }
      return {}
    })

    const mapRange = (start, end, value, newStart, newEnd) => {
      return newStart + ((newEnd - newStart) * (value - start)) / (end - start)
    }

    const handleScroll = () => {
      if (!overflow.value || !wrapper.value) return

      const scrollY = window.scrollY
      const start = wrapper.value.offsetTop
      const end =
        wrapper.value.offsetTop +
        wrapper.value.offsetHeight -
        window.innerHeight -
        400

      let progress = mapRange(start, end, scrollY, 0, 1)

      progress = Math.max(0, Math.min(progress, 1))

      // Adjusted the calculation for x
      const x = progress * (totalImagesWidth.value - windowWidth.value)

      const cards = Array.from(overflow.value.children)
      gsap.to(cards, {
        x: -x,
        stagger: 0.0175,
        ease: 'none',
        duration: 0,
      })
    }

    onMounted(() => {
      if (process.client) {
        window.addEventListener('scroll', handleScroll, false)

        // Cleanup event listener on component destroy
        return () => {
          window.removeEventListener('scroll', handleScroll, false)
        }
      }
    })

    return {
      wrapper,
      overflow,
      wrapperClass,
      wrapperStyle,
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

/* Breakpoints */
$mobile-breakpoint: 800px;

// Viewport Sizes
$desktop-width: 1440px;
$desktop-height: 850px;

$mobile-width: 375px;
$mobile-height: 650px;

// Breakpoint
@mixin mobile {
  @media (max-width: #{$mobile-breakpoint}) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: #{$mobile-breakpoint}) {
    @content;
  }
}

@function mobile-vw($pixels, $base-vw: $mobile-width) {
  @return math.div($pixels * 100vw, $base-vw);
}

@function mobile-vh($pixels, $base-vh: $mobile-height) {
  @return math.div($pixels * 100vh, $base-vh);
}

@function desktop-vw($pixels, $base-vw: $desktop-width) {
  @return math.div($pixels * 100vw, $base-vw);
}

@function desktop-vh($pixels, $base-vh: $desktop-height) {
  @return math.div($pixels * 100vh, $base-vh);
}

@function columns($columns) {
  @return calc(
    (#{$columns} * var(--layout-column-width)) +
      ((#{$columns} - 1) * var(--layout-columns-gap))
  );
}

@mixin hover {
  @media (hover: hover) {
    @content;
  }
}

.overflow {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000;
}

.overflow > * {
  transform: translate3d(0, 0, 0);
}

.wrapper {
  .inner {
    overflow: hidden;
    display: flex;

    .overflow {
      display: flex;

      > * {
        flex-shrink: 0;
      }
    }

    @include mobile {
      width: mobile-vw(375px);
    }

    @include desktop {
      position: sticky;
      --height: 60%;
      top: calc((100vh - var(--height)) / 2);
    }

    @include mobile {
      .cards {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;

        > * {
          margin-bottom: mobile-vw(32px);
        }
      }
    }
  }
}
</style>
