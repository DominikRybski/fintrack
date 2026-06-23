import { createClient } from '@supabase/supabase-js'

let _client = null

function getClient() {
  if (_client) return _client
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Brak konfiguracji Supabase. Dodaj VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY do pliku .env.local')
  }
  _client = createClient(url, key)
  return _client
}

export async function fetchTransactions() {
  const { data, error } = await getClient()
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data
}

export async function insertTransaction(transaction) {
  const { data, error } = await getClient()
    .from('transactions')
    .insert([transaction])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateTransaction(id, updates) {
  const { data, error } = await getClient()
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteTransaction(id) {
  const { error } = await getClient().from('transactions').delete().eq('id', id)
  if (error) throw error
}
