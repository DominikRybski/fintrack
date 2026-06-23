<script setup>
import { onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import BalanceSummary from '@/components/BalanceSummary.vue'
import CategoryChart from '@/components/CategoryChart.vue'
import FilterBar from '@/components/FilterBar.vue'

const store = useTransactionsStore()
onMounted(() => { if (store.transactions.length === 0) store.load() })
</script>

<template>
  <div>
    <BalanceSummary />
    <FilterBar />
    <CategoryChart />
  </div>
</template>
