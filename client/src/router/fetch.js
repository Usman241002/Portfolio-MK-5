import router from '@/router/index.js'
import useAuthStore from '@/stores/authStore.js'
import { pinia } from '@/main.js'

export async function api(url, options = {}) {
  const response = await fetch(url, options)

  if (response.status === 401) {
    const auth = useAuthStore(pinia)

    auth.logout()
    router.push('/login')

    return
  }

  return response
}
