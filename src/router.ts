import { createRouter, createWebHashHistory }
    from 'vue-router'
// import HousePurchasing from './components/HousePurchasing.vue'

import Start from '@/components/Start.vue'
import Index from '@/components/Index.vue'
import Exam from '@/components/Exam.vue'
const routes = [
  { path: "", component: Index },
  { path: "/Index", component: Index },
  { path: "/Start", component: Start },
  { path: "/Exam/:birthday/:gender", component: Exam },
  { path: "/404", component: Index },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router