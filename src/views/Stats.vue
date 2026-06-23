<script setup>
import { onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import BalanceSummary from '@/components/BalanceSummary.vue'
import FilterBar from '@/components/FilterBar.vue'

const store = useTransactionsStore()
onMounted(() => { if (store.transactions.length === 0) store.load() })
</script>

<template>
  <div>
    <BalanceSummary />
    <FilterBar />
    <p style="color: var(--color-text-muted); margin-top: 1rem; text-align: center;">
      Wykres wydatków będzie dostępny wkrótce.
    </p>
  </div>
</template>
