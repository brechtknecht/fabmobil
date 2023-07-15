<template>
  <div ref="wrapperRef" class="relative" style="display: inline-block">
    <slot></slot>
    <ClientOnly>
      <RoughCanvas
        :width="dimensions.width + padding * 2"
        :height="dimensions.height + padding * 2"
        :config="config"
        class="absolute"
        style="z-index: -1; top: -10px; left: -10px"
      >
        <RoughEllipse
          :x="dimensions.width / 2 + padding"
          :y="dimensions.height / 2 + padding"
          :width="dimensions.width"
          :height="dimensions.height"
          stroke="#DCB9FB"
          :stroke-width="6"
          :roughness="1"
          fill="#eee"
          fill-style="hachure"
          :hachure-gap="4"
          :hachure-angle="60"
        />
      </RoughCanvas>
    </ClientOnly>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'

export default {
  name: 'Rough',
  setup() {
    const wrapperRef = ref(null)
    const dimensions = reactive({ width: 0, height: 0 })
    const padding = 10

    const config = {
      roughness: 1.5,
      stroke: '#ffffff',
      strokeWidth: 3,
      fill: 'transparent',
    }

    onMounted(() => {
      const boundingBox = wrapperRef.value.getBoundingClientRect()
      dimensions.width = boundingBox.width
      dimensions.height = boundingBox.height
    })

    return {
      wrapperRef,
      dimensions,
      padding,
      config,
    }
  },
}
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
