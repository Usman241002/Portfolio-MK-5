<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button } from 'ant-design-vue'
import { EditOutlined, CloseOutlined, StarOutlined, StarFilled } from '@ant-design/icons-vue'
import useProjectStore from '@/stores/projectStore.js'
import dayjs from 'dayjs'

import ProjectModal from './ProjectModal.vue'

const projectStore = useProjectStore()

const isModalVisible = ref(false)
const selectedProject = ref(null)

onMounted(async () => {
  await projectStore.fetchProjects()
})

const openEditModal = (project) => {
  projectStore.setCurrentProject(project)
  selectedProject.value = project // Fix: Assign the selected project to the ref
  isModalVisible.value = true
}

async function onDelete(id) {
  await projectStore.deleteProjectById(id)
}

async function onFeatured(project) {
  await projectStore.toggleFeatured(project)
}
</script>

<template>
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
              <Button
                @click="openEditModal(project)"
                type="text"
                shape="circle"
                ghost
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(project.id)"
                type="text"
                shape="circle"
                ghost
                danger
              >
                <CloseOutlined />
              </Button>
              <Button
                @click="onFeatured(project)"
                type="text"
                shape="circle"
                :style="{color: '#F5A623'}"
                ghost
              >
                <!-- Fix: Use v-if/v-else instead of JSX interpolation -->
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
