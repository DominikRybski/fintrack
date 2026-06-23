<script setup>
import { useTransactionsStore } from '@/stores/transactions'
const store = useTransactionsStore()

function fmt(n) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(n)
}
</script>

<template>
  <div class="summary">
    <div class="card summary-card">
      <span class="label">Saldo</span>
      <span class="value" :class="store.balance >= 0 ? 'positive' : 'negative'">
        {{ fmt(store.balance) }}
      </span>
    </div>
    <div class="card summary-card">
      <span class="label">Przychody</span>
      <span class="value positive">{{ fmt(store.totalIncome) }}</span>
    </div>
    <div class="card summary-card">
      <span class="label">Wydatki</span>
      <span class="value negative">{{ fmt(store.totalExpense) }}</span>
    </div>
  </div>
</template>

<style scoped>
.summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.summary-card { text-align: center; }
.label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin-bottom: 0.25rem; }
.value { font-size: 1.4rem; font-weight: 700; }
.positive { color: var(--color-income); }
.negative { color: var(--color-expense); }
@media (max-width: 480px) { .summary { grid-template-columns: 1fr; } }
</style>
