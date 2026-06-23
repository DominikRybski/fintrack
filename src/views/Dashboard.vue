<script setup>
import { ref, onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import BalanceSummary from '@/components/BalanceSummary.vue'
import FilterBar from '@/components/FilterBar.vue'
import TransactionForm from '@/components/TransactionForm.vue'
import TransactionList from '@/components/TransactionList.vue'

const store = useTransactionsStore()
const editingTransaction = ref(null)

onMounted(() => store.load())

function handleEdit(t) { editingTransaction.value = t }
function handleDone() { editingTransaction.value = null }
</script>

<template>
  <div>
    <BalanceSummary />
    <TransactionForm
      :editing="editingTransaction"
      @done="handleDone"
    />
    <FilterBar />
    <TransactionList @edit="handleEdit" />
  </div>
</template>
