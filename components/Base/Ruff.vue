<template>
  <div ref="wrapperRef" class="relative" style="display: inline-block">
    <div class="relative z-10">
      <slot></slot>
    </div>
    <ClientOnly>
      <RoughCanvas
        :width="dimensions.width + padding * 2"
        :height="dimensions.height + padding * 2"
        :config="config"
        class="absolute z-40"
        :style="{ zIndex: 1, top: `-${padding}px`, left: `-${padding}px` }"
      >
        <RoughEllipse
          :x="dimensions.width / 2 + padding"
          :y="dimensions.height / 2 + padding"
          :width="dimensions.width + padding"
          :height="dimensions.height + padding"
          stroke="#DCB9FB"
          :stroke-width="6"
          :roughness="2"
        />
      </RoughCanvas>
    </ClientOnly>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'

export default {
  name: 'Rough',
  props: {
    padding: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const wrapperRef = ref(null)
    const dimensions = reactive({ width: 0, height: 0 })

    // Use `toRefs` to convert reactive `props` into plain references
    const { padding } = toRefs(props)

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
