import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import { api } from '@/router/fetch.js'
import useAuthStore from './authStore.js'

const useSkillStore = defineStore("skill", () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const skills = ref([])

  const getEmptySkill = () => ({
    id: Date.now(),
    name: '',
    year: new Date().getFullYear()
  })
  const currentSkill = ref(getEmptySkill())

  function resetCurrentSkill() {
    currentSkill.value = getEmptySkill()
  }

  function setCurrentSkill(skill) {
    currentSkill.value = JSON.parse(JSON.stringify(skill))
  }

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

      const response = await api(`${API_URL}/api/skills`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentSkill.value),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create skill')
      }

      const skillId = data.skillId
      skills.value.push({...currentSkill.value, id: skillId})

      return data
    } catch(error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateSkill() {
    try {
      loading.value = true
      const id = currentSkill.value.id

      const response = await api(`${API_URL}/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentSkill.value),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update skill')
      }

      const index = skills.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        skills.value[index] = data.skill || { ...currentSkill.value }
      }

      return data
    } catch(error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteSkillById(id) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete skill')
      }

      skills.value = skills.value.filter((skill) => skill.id !== id)
      return data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
      loading,
      skills,
      currentSkill,
      setCurrentSkill,
      resetCurrentSkill,
      fetchSkills,
      createSkill,
      updateSkill,
      deleteSkillById,
    }
})

export default useSkillStore
