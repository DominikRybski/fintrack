<script setup>
import { ref } from 'vue'
import { useTransactionsStore, CATEGORIES } from '@/stores/transactions'

const store = useTransactionsStore()
const emit = defineEmits(['done'])

const props = defineProps({
  editing: { type: Object, default: null },
})

const form = ref({
  name: props.editing?.name ?? '',
  amount: props.editing?.amount ?? '',
  type: props.editing?.type ?? 'expense',
  category: props.editing?.category ?? '',
  date: props.editing?.date ?? new Date().toISOString().slice(0, 10),
  note: props.editing?.note ?? '',
})

const errors = ref({})
const saving = ref(false)

function validate() {
  const e = {}
  if (!form.value.name.trim()) e.name = 'Podaj nazwę'
  if (!form.value.amount || Number(form.value.amount) <= 0) e.amount = 'Kwota musi być większa od zera'
  if (!form.value.category) e.category = 'Wybierz kategorię'
  if (!form.value.date) e.date = 'Podaj datę'
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return
  saving.value = true
  try {
    const data = { ...form.value, amount: Number(form.value.amount) }
    if (props.editing) {
      await store.update(props.editing.id, data)
    } else {
      await store.add(data)
      form.value = { name: '', amount: '', type: 'expense', category: '', date: new Date().toISOString().slice(0, 10), note: '' }
    }
    emit('done')
  } catch (e) {
    errors.value.general = e.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <form class="transaction-form card" @submit.prevent="submit">
    <h2>{{ editing ? 'Edytuj transakcję' : 'Dodaj transakcję' }}</h2>

    <div class="form-grid">
      <div class="form-group">
        <label>Nazwa</label>
        <input v-model="form.name" placeholder="np. Zakupy Biedronka" />
        <span class="error-msg" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label>Kwota (PLN)</label>
        <input v-model="form.amount" type="number" min="0.01" step="0.01" placeholder="0.00" />
        <span class="error-msg" v-if="errors.amount">{{ errors.amount }}</span>
      </div>

      <div class="form-group">
        <label>Typ</label>
        <select v-model="form.type">
          <option value="expense">Wydatek</option>
          <option value="income">Przychód</option>
        </select>
      </div>

      <div class="form-group">
        <label>Kategoria</label>
        <select v-model="form.category">
          <option value="" disabled>Wybierz...</option>
          <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
        </select>
        <span class="error-msg" v-if="errors.category">{{ errors.category }}</span>
      </div>

      <div class="form-group">
        <label>Data</label>
        <input v-model="form.date" type="date" />
        <span class="error-msg" v-if="errors.date">{{ errors.date }}</span>
      </div>

      <div class="form-group">
        <label>Notatka (opcjonalnie)</label>
        <input v-model="form.note" placeholder="Dodatkowe informacje..." />
      </div>
    </div>

    <span class="error-msg" v-if="errors.general">{{ errors.general }}</span>

    <div class="actions">
      <button class="btn btn-primary" type="submit" :disabled="saving">
        {{ saving ? 'Zapisuję...' : (editing ? 'Zapisz zmiany' : 'Dodaj') }}
      </button>
      <button v-if="editing" class="btn btn-ghost" type="button" @click="emit('done')">Anuluj</button>
    </div>
  </form>
</template>

<style scoped>
h2 { font-size: 1rem; margin-bottom: 1rem; }
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
.actions { display: flex; gap: 0.75rem; margin-top: 1rem; }
@media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } }
</style>
