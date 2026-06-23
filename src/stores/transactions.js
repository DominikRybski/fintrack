import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fetchTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/services/supabase'

export const CATEGORIES = [
  'Jedzenie', 'Transport', 'Rachunki', 'Rozrywka',
  'Zdrowie', 'Odzież', 'Edukacja', 'Oszczędności', 'Inne',
]

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filterCategory = ref('')
  const filterType = ref('')
  const filterMonth = ref('')

  const filtered = computed(() => {
    return transactions.value.filter((t) => {
      if (filterCategory.value && t.category !== filterCategory.value) return false
      if (filterType.value && t.type !== filterType.value) return false
      if (filterMonth.value && !t.date.startsWith(filterMonth.value)) return false
      return true
    })
  })

  const totalIncome = computed(() =>
    filtered.value.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  )
  const totalExpense = computed(() =>
    filtered.value.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)

  const expenseByCategory = computed(() => {
    const map = {}
    filtered.value
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount)
      })
    return map
  })

  async function load() {
    loading.value = true
    error.value = null
    try {
      transactions.value = await fetchTransactions()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function add(transaction) {
    const record = await insertTransaction(transaction)
    transactions.value.unshift(record)
  }

  async function update(id, updates) {
    const record = await updateTransaction(id, updates)
    const idx = transactions.value.findIndex((t) => t.id === id)
    if (idx !== -1) transactions.value[idx] = record
  }

  async function remove(id) {
    await deleteTransaction(id)
    transactions.value = transactions.value.filter((t) => t.id !== id)
  }

  return {
    transactions,
    filtered,
    loading,
    error,
    filterCategory,
    filterType,
    filterMonth,
    totalIncome,
    totalExpense,
    balance,
    expenseByCategory,
    load,
    add,
    update,
    remove,
  }
})
