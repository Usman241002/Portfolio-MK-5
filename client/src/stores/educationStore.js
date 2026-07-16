import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import useAuthStore from './authStore.js'

const useEducationStore = defineStore("education", () => {
  const authStore = useAuthStore
  const loading = ref(false)
  const education = ref([])

  async function fetchEducation() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/education`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch education')
      education.value = data.education
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function createEducation() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function updateEducation() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteEducation() {
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
      education,
      fetchEducation,
      createEducation,
      updateEducation,
      deleteEducation,
    }
})

export default useEducationStore
