import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import useAuthStore from './authStore.js'

const useExperienceStore = defineStore("experience", () => {
  const authStore = useAuthStore
  const loading = ref(false)
  const experiences = ref([])

  async function fetchExperiences() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/experiences`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch experiences')
      experiences.value = data.experiences
      console.log(experiences.value)
      console.log(data.experiences)
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function createExperience() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function updateExperience() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteExperience() {
    try {
      loading.value = true


    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
      loading,
      experiences,
      fetchExperiences,
      createExperience,
      updateExperience,
      deleteExperience,
    }
})

export default useExperienceStore
