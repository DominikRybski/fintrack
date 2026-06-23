<script setup>
import { useTransactionsStore, CATEGORIES } from '@/stores/transactions'
const store = useTransactionsStore()
</script>

<template>
  <div class="filter-bar card">
    <div class="form-group">
      <label>Kategoria</label>
      <select v-model="store.filterCategory">
        <option value="">Wszystkie</option>
        <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>
    <div class="form-group">
      <label>Typ</label>
      <select v-model="store.filterType">
        <option value="">Wszystkie</option>
        <option value="expense">Wydatek</option>
        <option value="income">Przychód</option>
      </select>
    </div>
    <div class="form-group">
      <label>Miesiąc</label>
      <input type="month" v-model="store.filterMonth" />
    </div>
    <button class="btn btn-ghost" @click="store.filterCategory = ''; store.filterType = ''; store.filterMonth = ''">
      Wyczyść
    </button>
  </div>
</template>

<style scoped>
.filter-bar { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; margin-bottom: 1.5rem; }
.form-group { flex: 1; min-width: 130px; }
</style>
