import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import useAuthStore from './authStore.js'

const useProfileStore = defineStore("Profile", () => {
  const authStore = useAuthStore
  const loading = ref(false)
  const profile = ref([])

  async function fetchProfile() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/profile`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch profile')
      profile.value = data.profile
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function updateProfile() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
      loading,
      profile,
      fetchProfile,
      updateProfile,
    }
})

export default useProfileStore
