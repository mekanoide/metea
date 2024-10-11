<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs'
import colors from 'tailwindcss/colors'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { color } from 'chart.js/helpers'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  CategoryScale,
  LineElement,
  LinearScale
)

type ChartData = {
  labels: string[]
  datasets: object[]
}

const props = defineProps<{
  data: ChartData
}>()

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 100
    }
  }
}

</script>

<template>
  <div>
    <Line
      id="humidity-chart"
      :data="props.data"
      :options="chartOptions" />
  </div>
</template>
