<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '250px',
  },
})

const chart = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const parseOptions = (option: string): echarts.EChartsOption => {
  try {
    return JSON.parse(option)
  } catch (error) {
    console.log('Failed to parse options:', error)
    return {}
  }
}

const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value)
    chartInstance.setOption(parseOptions(props.option))
  }
}

const updateChart = () => {
  if (chartInstance) {
    chartInstance.setOption(parseOptions(props.option))
  }
}

onMounted(() => initChart())

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})

watch(() => props.option, updateChart, { deep: true })
</script>

<template>
  <div ref="chart" :style="{ width: width, height: height }" />
</template>

<style scoped></style>
