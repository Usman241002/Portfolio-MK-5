<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button } from 'ant-design-vue'
import { EditOutlined, CloseOutlined } from '@ant-design/icons-vue'
import useSkillStore from '@/stores/skillStore.js'

import SkillModal from './SkillModal.vue'
import BaseButton from '../portfolio/BaseButton.vue'

const skillStore = useSkillStore()

const isModalVisible = ref(false)
const selectedSkill = ref(null)

onMounted(async () => {
  await skillStore.fetchSkills()
})

const openEditModal = (skill) => {
  skillStore.setCurrentSkill(skill)
  selectedSkill.value = skill
  isModalVisible.value = true
}

async function onDelete(id) {
  await skillStore.deleteSkillById(id)
}

function openCreateModal() {
  skillStore.resetCurrentSkill()
  selectedSkill.value = skillStore.currentSkill
  isModalVisible.value = true
}

</script>

<template>
  <Teleport to="#header-actions">
    <BaseButton @click="openCreateModal">Add Skill</BaseButton>
  </Teleport>

  <Flex vertical>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="skill in skillStore.skills" :key="skill.id">
          <td>{{ skill.id }}</td>
          <td>{{ skill.name }}</td>
          <td>{{ skill.year }}</td>

          <td>
            <Flex gap="8">
              <Button
                @click="openEditModal(skill)"
                type="text"
                shape="circle"
                ghost
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(skill.id)"
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

    <SkillModal v-model:modalVisible="isModalVisible" :skill="selectedSkill" />
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
