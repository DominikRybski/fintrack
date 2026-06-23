<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useTransactionsStore } from '@/stores/transactions'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useTransactionsStore()

const COLORS = ['#6366f1','#22c55e','#ef4444','#f59e0b','#3b82f6','#ec4899','#14b8a6','#8b5cf6','#f97316']

const chartData = computed(() => {
  const entries = Object.entries(store.expenseByCategory)
  return {
    labels: entries.map(([k]) => k),
    datasets: [{
      data: entries.map(([, v]) => v),
      backgroundColor: COLORS.slice(0, entries.length),
      borderWidth: 2,
    }],
  }
})

const options = {
  responsive: true,
  plugins: { legend: { position: 'bottom' } },
}
</script>

<template>
  <div class="chart-wrap card">
    <h3>Wydatki wg kategorii</h3>
    <div v-if="Object.keys(store.expenseByCategory).length === 0" class="no-data">
      Brak wydatków do wyświetlenia.
    </div>
    <Doughnut v-else :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
h3 { margin-bottom: 1rem; font-size: 1rem; }
.chart-wrap { max-width: 380px; }
.no-data { color: var(--color-text-muted); font-size: 0.9rem; }
</style>
