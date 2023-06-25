<template>
  <ClientOnly>
    <RoughCanvas width="720" height="500" :config="config">
      <RoughEllipse :x="500" :y="100" :width="300" :height="170" />
    </RoughCanvas>
  </ClientOnly>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      config: {
        roughness: 1.5, // higher numbers will produce rougher drawings
        stroke: '#ffffff', // color of the lines
        strokeWidth: 10, // thickness of the lines
        fill: '#f0f0f0', // fill color
        // add more properties as per your requirement
      },
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
