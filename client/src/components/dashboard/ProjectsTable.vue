<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button, message } from 'ant-design-vue'
import { EditOutlined, CloseOutlined, StarOutlined, StarFilled } from '@ant-design/icons-vue'
import useProjectStore from '@/stores/projectStore.js'

import BaseButton from '@/components/portfolio/BaseButton.vue'
import ProjectModal from './ProjectModal.vue'

const projectStore = useProjectStore()

const isModalVisible = ref(false)
const selectedProject = ref(null)

onMounted(async () => {
  await projectStore.fetchProjects()
})

function openCreateModal() {
  projectStore.resetCurrentProject()
  selectedProject.value = projectStore.currentProject
  isModalVisible.value = true
}

const openEditModal = (project) => {
  projectStore.setCurrentProject(project)
  selectedProject.value = project
  isModalVisible.value = true
}

async function onDelete(id) {
  try {
    await projectStore.deleteProjectById(id)
    message.success('Project deleted')
  } catch (error) {
    message.error(error.message)
  }
}

async function onFeatured(project) {
  try {
    await projectStore.toggleFeatured(project)
    message.success(`${project.title}: Featured status updated`)
  } catch (error) {
    message.error(error.message || 'Failed to update featured status')
  }
}
</script>

<template>
  <Teleport to="#header-actions" defer>
    <BaseButton @click="openCreateModal">Add Project</BaseButton>
  </Teleport>

  <Flex vertical>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Project</th>
          <th>Year</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projectStore.projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>{{ project.year }}</td>
          <td>{{ project.status }}</td>
          <td>
            <Flex gap="8">
              <!-- 3. FIXED: Removed "ghost" prop from text buttons to fix console warnings -->
              <Button
                @click="openEditModal(project)"
                type="text"
                shape="circle"
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(project.id)"
                type="text"
                shape="circle"
                danger
              >
                <CloseOutlined />
              </Button>
              <Button
                @click="onFeatured(project)"
                type="text"
                shape="circle"
                :style="{color: '#F5A623'}"
              >
                <StarFilled v-if="project.featured" />
                <StarOutlined v-else />
              </Button>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <ProjectModal v-model:modalVisible="isModalVisible" :project="selectedProject" />
  </Flex>
</template>

<style scoped>
table {
  width: 100%;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  text-transform: uppercase;
}

td {
  font: var(--body);
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: var(--hover);
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>
