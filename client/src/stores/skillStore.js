import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import useAuthStore from './authStore.js'

const useSkillStore = defineStore("skill", () => {
  const authStore = useAuthStore
  const loading = ref(false)
  const skills = ref([])

  async function fetchSkills() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/skills`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch skills')
      skills.value = data.skills
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function createSkill() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function updateSkill() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteSkill() {
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
      skills,
      fetchSkills,
      createSkill,
      updateSkill,
      deleteSkill,
    }
})

export default useSkillStore
