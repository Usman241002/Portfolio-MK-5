import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import { api } from '@/router/fetch.js'
import useAuthStore from './authStore.js'

const useEducationStore = defineStore("education", () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const education = ref([])

  const getEmptyEducation = () => ({
    id: Date.now(),
    start_date: '',
    end_date: '',
    title: '',
    company: '',
    location: '',
    description: '',
  })
  const currentEducation = ref(getEmptyEducation())

  function resetCurrentEducation() {
    currentEducation.value = getEmptyEducation()
  }

  function setCurrentEducation(education) {
    currentEducation.value = JSON.parse(JSON.stringify(education))
  }

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

  async function updateEducationById() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteEducationById(id) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/education/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to delete project')

      education.value = education.value.filter((edu) => edu.id !== id)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    education,
    currentEducation,
    setCurrentEducation,
    resetCurrentEducation,
    fetchEducation,
    createEducation,
    updateEducationById,
    deleteEducationById,
    }
})

export default useEducationStore
