<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button, message } from 'ant-design-vue'
import { EditOutlined, CloseOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'

import useEducationStore from '@/stores/educationStore.js'

import EducationModal from './EducationModal.vue'

const educationStore = useEducationStore()

const isModalVisible = ref(false)
const selectedEducation = ref(null)

onMounted(async () => {
  await educationStore.fetchEducation()
})

const openEditModal = (education) => {
  educationStore.setCurrentEducation(education)
  selectedEducation.value = education
  isModalVisible.value = true
}

async function onDelete(id) {
  try {
    await educationStore.deleteEducationById(id)
    message.success('Education deleted')
  } catch (error) {
    message.error(error)
  }
}

function openCreateModal() {
  educationStore.resetCurrentEducation()
  selectedEducation.value = educationStore.currentEducation
  isModalVisible.value = true
}

</script>

<template>
<Teleport to="#header-actions" defer>
  <BaseButton @click="openCreateModal">Add Education</BaseButton>
</Teleport>

  <Flex vertical>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="education in educationStore.education" :key="education.id">
          <td>{{ education.title }}</td>
          <td>{{ education.company }}</td>
          <td>{{ education.location }}</td>
          <td>
            <Flex gap="8">
              <Button
                @click="openEditModal(education)"
                type="text"
                shape="circle"
                ghost
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(education.id)"
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

    <EducationModal v-model:modalVisible="isModalVisible" :education="selectedEducation" />
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
