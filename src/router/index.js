import { createRouter, createWebHistory } from 'vue-router'
import JournalEntries from '../views/journal_entries.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'journal',
      component: JournalEntries
    },
  ]
})

export default router
