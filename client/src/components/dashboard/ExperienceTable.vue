<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button, message } from 'ant-design-vue'
import { EditOutlined, CloseOutlined } from '@ant-design/icons-vue'
import useExperienceStore from '@/stores/experienceStore.js'
import BaseButton from '../portfolio/BaseButton.vue'

import ExperienceModal from './ExperienceModal.vue'

const experienceStore = useExperienceStore()

const isModalVisible = ref(false)
const selectedExperience = ref(null)

onMounted(async () => {
  await experienceStore.fetchExperiences()
})

const openEditModal = (experience) => {
  experienceStore.setCurrentExperience(experience)
  selectedExperience.value = experience
  isModalVisible.value = true
}

async function onDelete(id) {
  try {
    await experienceStore.deleteExperienceById(id)
    message.success('Experience deleted')
  } catch (error) {
    message.error(error)
  }
}

function openCreateModal() {
  experienceStore.resetCurrentExperience()
  selectedExperience.value = experienceStore.currentExperience
  isModalVisible.value = true
}

</script>

<template>

  <Teleport to="#header-actions" defer>
    <BaseButton @click="openCreateModal">Add Experience</BaseButton>
  </Teleport>

  <Flex vertical>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="experience in experienceStore.experiences" :key="experience.id">
          <td>{{ experience.id }}</td>
          <td>{{ experience.title }}</td>
          <td>{{ experience.company }}</td>
          <td>{{ experience.location }}</td>
          <td>
            <Flex gap="8">
              <Button
                @click="openEditModal(experience)"
                type="text"
                shape="circle"
                ghost
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(experience.id)"
                type="text"
                shape="circle"
                ghost
                danger
              >
                <CloseOutlined />
              </Button>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <ExperienceModal v-model:modalVisible="isModalVisible" :experience="selectedExperience" />
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
