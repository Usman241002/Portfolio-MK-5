import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'
import { api } from '@/router/fetch.js'
import useAuthStore from './authStore.js'

const useProjectStore = defineStore("projects", () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const projects = ref([])
  const featuredProjects = ref([])

  const getEmptyProject = () => ({
      id: null,
      title: '',
      subtitle: '',
      client: '',
      role: '',
      year: '',
      description: '',
      status: '',
      repository_url: '',
      live_demo_url: '',
      thumbnail: null,
      skills: [], // Note: Changed to skills to match your UI component
      cases: [],
    })
  const currentProject = ref(getEmptyProject())

  function resetCurrentProject() {
    currentProject.value = getEmptyProject()
  }

  function setCurrentProject(project) {
    currentProject.value = JSON.parse(JSON.stringify(project))
  }

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

  async function fetchProjectById(id) {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/projects/${id}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch projects')
      return data.project
    } catch(error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function createProjects() {
    try {
      loading.value = true

      // 1. Separate the thumbnail from the normal data
      const { thumbnail, ...payload } = currentProject.value

      // 2. Send JSON request first
      const response = await api(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json', // Back to clean JSON!
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project')
      }

      const projectId = data.projectId || data.project?.id
      let finalProject = data.project || { ...payload, id: projectId }

      // 3. Upload thumbnail separately if it's a new File
      if (thumbnail instanceof File) {
        const imageForm = new FormData()
        imageForm.append('thumbnail', thumbnail)

        const imageResponse = await api(`${API_URL}/api/projects/${projectId}/thumbnail`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            // No Content-Type header for FormData!
          },
          body: imageForm,
        })

        const imageData = await imageResponse.json()
        if (!imageResponse.ok) throw new Error(imageData.message || 'Failed to upload thumbnail')

        if (imageData.thumbnail) {
          finalProject.thumbnail = imageData.thumbnail
        }
      }

      // Update local UI
      projects.value.push(finalProject)
      return data

    } catch(error) {
      console.error(error)
      throw error // Let the modal catch it
    } finally {
      loading.value = false
    }
  }

  async function updateProjectById() {
    try {
      loading.value = true
      const id = currentProject.value.id

      // 1. Separate the thumbnail from the normal data
      const { thumbnail, ...payload } = currentProject.value

      // If user clicked "remove", tell the backend via a flag in the JSON
      if (thumbnail === null) {
        payload.remove_thumbnail = true
      }

      // 2. Send JSON request first
      const response = await api(`${API_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json', // Back to clean JSON!
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update project')
      }

      let finalProject = data.project || { ...currentProject.value }

      // 3. Upload thumbnail separately if it's a new File
      if (thumbnail instanceof File) {
        const imageForm = new FormData()
        imageForm.append('thumbnail', thumbnail)

        const imageResponse = await api(`${API_URL}/api/projects/${id}/thumbnail`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            // No Content-Type header for FormData!
          },
          body: imageForm,
        })

        const imageData = await imageResponse.json()
        if (!imageResponse.ok) throw new Error(imageData.message || 'Failed to upload thumbnail')

        if (imageData.thumbnail) {
          finalProject.thumbnail = imageData.thumbnail
        }
      } else if (thumbnail === null) {
        finalProject.thumbnail = null
      }

      // Update local UI
      const index = projects.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        projects.value[index] = finalProject
      }

      return data

    } catch(error) {
      console.error(error)
      throw error // Let the modal catch it
    } finally {
      loading.value = false
    }
  }

  async function toggleFeatured(project) {
    try {
      const newFeaturedStatus = !project.featured

      if (newFeaturedStatus) {
        const currentFeaturedCount = projects.value.filter((p) => p.featured).length
        if (currentFeaturedCount >= 3) {
          throw new Error('You cannot feature more than 3 projects at a time.')
        }
      }

      const response = await api(`${API_URL}/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({ featured: newFeaturedStatus })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update featured status')

      const index = projects.value.findIndex((p) => p.id === project.id)
      if (index !== -1) {
        projects.value[index].featured = newFeaturedStatus
      }

      if (newFeaturedStatus) {
        featuredProjects.value.push(projects.value[index])
      } else {
        featuredProjects.value = featuredProjects.value.filter(p => p.id !== project.id)
      }

    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteProjectById(id) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to delete project')

      projects.value = projects.value.filter((project) => project.id !== id)
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
    currentProject,
    setCurrentProject,
    resetCurrentProject,
    fetchProjects,
    fetchFeaturedProjects,
    createProjects,
    toggleFeatured,
    fetchProjectById,
    updateProjectById,
    deleteProjectById,
  }
})

export default useProjectStore
