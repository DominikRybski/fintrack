<script setup>
defineProps({ transaction: Object })
defineEmits(['edit', 'delete'])

function fmt(n) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(n)
}
</script>

<template>
  <div class="item">
    <div class="item-left">
      <div class="item-name">{{ transaction.name }}</div>
      <div class="item-meta">
        <span class="badge" :class="transaction.type === 'income' ? 'badge-income' : 'badge-expense'">
          {{ transaction.type === 'income' ? 'Przychód' : 'Wydatek' }}
        </span>
        <span class="item-category">{{ transaction.category }}</span>
        <span class="item-date">{{ transaction.date }}</span>
      </div>
      <div class="item-note" v-if="transaction.note">{{ transaction.note }}</div>
    </div>
    <div class="item-right">
      <span class="amount" :class="transaction.type === 'income' ? 'positive' : 'negative'">
        {{ transaction.type === 'income' ? '+' : '-' }}{{ fmt(transaction.amount) }}
      </span>
      <div class="item-actions">
        <button class="btn btn-ghost icon-btn" @click="$emit('edit', transaction)" title="Edytuj">✏️</button>
        <button class="btn btn-danger icon-btn" @click="$emit('delete', transaction.id)" title="Usuń">🗑</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
.item:last-child { border-bottom: none; }
.item-name { font-weight: 600; font-size: 0.95rem; }
.item-meta { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-top: 0.15rem; }
.item-category, .item-date { font-size: 0.78rem; color: var(--color-text-muted); }
.item-note { font-size: 0.78rem; color: var(--color-text-muted); margin-top: 0.15rem; font-style: italic; }
.item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; }
.amount { font-size: 1.05rem; font-weight: 700; }
.positive { color: var(--color-income); }
.negative { color: var(--color-expense); }
.item-actions { display: flex; gap: 0.25rem; }
.icon-btn { padding: 0.2rem 0.4rem; font-size: 0.85rem; }
</style>
