<script setup>
import { useTransactionsStore } from '@/stores/transactions'
import TransactionItem from './TransactionItem.vue'
import EmptyState from './EmptyState.vue'

const store = useTransactionsStore()
const emit = defineEmits(['edit'])
</script>

<template>
  <div class="card">
    <div v-if="store.loading" class="state-msg">Ładowanie...</div>
    <div v-else-if="store.error" class="state-msg error">Błąd: {{ store.error }}</div>
    <EmptyState v-else-if="store.filtered.length === 0" />
    <TransactionItem
      v-else
      v-for="t in store.filtered"
      :key="t.id"
      :transaction="t"
      @edit="emit('edit', $event)"
      @delete="store.remove($event)"
    />
  </div>
</template>

<style scoped>
.state-msg { text-align: center; padding: 2rem; color: var(--color-text-muted); }
.error { color: var(--color-expense); }
</style>
