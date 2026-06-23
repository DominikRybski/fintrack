import { createRouter, createWebHashHistory } from 'vue-router'

const Dashboard = { template: '<div><h2>Dashboard</h2><p>Tutaj będzie lista transakcji.</p></div>' }
const Stats = { template: '<div><h2>Statystyki</h2><p>Tutaj będą wykresy.</p></div>' }

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/stats', component: Stats },
  ],
})
