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

type humidityData = {
  value: number
  hora: number
}

const props = defineProps<{
  data: humidityData[]
}>()

const labels = props.data.map((item: any) => `${item.hora}:00`)
const values = props.data.map((item: any) => item.value)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      min: 0,
      max: 100
    }
  }
}

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Humedad relativa',
      backgroundColor: colors.gray[500],
      borderColor: colors.gray[500],
      data: values
    },
    {
      label: 'Prob. precipitación',
      backgroundColor: colors.blue[500],
      borderColor: colors.blue[500],
      data: values
    }
  ]
}
</script>

<template>
  <div>
    <Line
      id="humidity-chart"
      :data="chartData"
      :options="chartOptions" />
  </div>
</template>
