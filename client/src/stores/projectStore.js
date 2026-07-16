import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import useAuthStore from './authStore.js'

const useProjectStore = defineStore("projects", () => {
  const authStore = useAuthStore
  const loading = ref(false)
  const projects = ref([])
  const featuredProjects = ref([])

  async function fetchProjects() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/projects`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch projects')
      projects.value = data.projects
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedProjects() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/projects/featured`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch projects')
      featuredProjects.value = data.projects
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function createProjects() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function updateProjects() {
    try {
      loading.value = true


    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteProjects() {
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
      projects,
      featuredProjects,
      fetchProjects,
      fetchFeaturedProjects,
      createProjects,
      updateProjects,
      deleteProjects,
    }
})

export default useProjectStore
