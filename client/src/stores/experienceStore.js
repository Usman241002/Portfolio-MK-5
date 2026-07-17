import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import { api } from '@/router/fetch.js'
import useAuthStore from './authStore.js'

const useExperienceStore = defineStore("experience", () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const experiences = ref([])

  const getEmptyExperience = () => ({
    id: Date.now(),
    start_date: '',
    end_date: '',
    title: '',
    employment_type: 'full-time',
    company: '',
    location: '',
    description: '',
  })
  const currentExperience = ref(getEmptyExperience())

  function resetCurrentExperience() {
    currentExperience.value = getEmptyExperience()
  }

  function setCurrentExperience(experience) {
    currentExperience.value = JSON.parse(JSON.stringify(experience))
  }

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

  async function updateExperienceById() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteExperienceById(id) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/experiences/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to delete project')

      experiences.value = experiences.value.filter((experiece) => experiece.id !== id)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
      loading,
      experiences,
      currentExperience,
      setCurrentExperience,
      resetCurrentExperience,
      fetchExperiences,
      createExperience,
      updateExperienceById,
      deleteExperienceById,
    }
})

export default useExperienceStore
