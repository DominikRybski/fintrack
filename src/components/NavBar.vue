<script setup>
import { ref } from 'vue'

const dark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

function toggleDark() {
  dark.value = !dark.value
  document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : '')
}
</script>

<template>
  <nav class="navbar">
    <span class="logo">💰 FinTrack</span>
    <div class="links">
      <RouterLink to="/" active-class="active">Dashboard</RouterLink>
      <RouterLink to="/stats" active-class="active">Statystyki</RouterLink>
    </div>
    <button class="btn btn-ghost dark-btn" @click="toggleDark" :title="dark ? 'Jasny' : 'Ciemny'">
      {{ dark ? '☀️' : '🌙' }}
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo { font-weight: 700; font-size: 1.1rem; }
.links { display: flex; gap: 1rem; flex: 1; }
.links a { color: var(--color-text-muted); font-size: 0.9rem; font-weight: 500; padding: 0.25rem 0.5rem; border-radius: 0.4rem; }
.links a.active { color: var(--color-primary); background: #eef2ff; }
.dark-btn { padding: 0.35rem 0.6rem; font-size: 1rem; }
</style>
