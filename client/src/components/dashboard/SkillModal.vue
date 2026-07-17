<script setup>
import { ref, watch, computed } from 'vue'
import {
  Modal,
  Flex,
  Divider,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  message,
} from 'ant-design-vue'
import Subtitle from '../portfolio/Subtitle.vue'

import useSkillStore from '@/stores/skillStore.js'

const props = defineProps({
  modalVisible: Boolean,
  skill: {
    type: [Object, null],
    required: true,
  },
})

const emit = defineEmits(['update:modalVisible', 'save'])
const close = () => emit('update:modalVisible', false)

const skillStore = useSkillStore()

const formData = ref({})
const formRef = ref(null)

watch(
  () => props.skill,
  (newVal) => {
    formData.value = newVal
      ? { ...newVal, year: newVal.year ? String(newVal.year) : undefined }
      : {}
  },
  { immediate: true }
)

const isEditing = computed(() => {
  if (!formData.value.id) return false
  return skillStore.skills.some((s) => s.id === formData.value.id)
})

async function onSave() {
  try {
    await formRef.value.validate()

    const payload = {
      ...formData.value,
      year: Number(formData.value.year)
    }

    skillStore.setCurrentSkill(payload)

    if (isEditing.value) {
      await skillStore.updateSkill()
    } else {
      await skillStore.createSkill()
    }

    message.success(`Skill ${isEditing.value ? 'updated' : 'created'} successfully`)

    emit('save')
    close()
  } catch (error) {
    message.error(error)
  }
}

const rules = {
  name: [
    {
      required: true,
      message: 'Please enter a skill name',
    },
    {
      max: 255,
      message: 'Skill name cannot exceed 255 characters',
    },
  ],
  year: [
    {
      required: true,
      message: 'Please select a year',
    },
  ],
}
</script>

<template>
  <Modal
    :open="modalVisible"
    @cancel="close"
    :title="isEditing ? 'Edit Skill' : 'New Skill'"
    width="45%"
    centered
  >
    <template #footer>
      <Flex gap="16" justify="end">
        <Button @click="close">Cancel</Button>
        <Button @click="onSave" type="primary" :disabled="!skill">
          {{ isEditing ? 'Update' : 'Create' }}
        </Button>
      </Flex>
    </template>

    <Flex
      v-if="skill"
      vertical
      :style="{ overflowY: 'auto', overflowX: 'hidden', minHeight: '30vh', maxHeight: '70vh' }"
    >
      <Subtitle>Skill Info</Subtitle>
      <Divider
        :style="{
          margin: '0.75rem',
          border: '1px solid var(--border)',
        }"
      />

      <Form
        ref="formRef"
        layout="vertical"
        :model="formData"
        :rules="rules"
      >
        <Row :gutter="12">
          <Col :span="24">
            <Form.Item class="form-label" name="name" label="Name">
              <Input class="form-input" v-model:value="formData.name" />
            </Form.Item>
          </Col>

          <Col :span="24">
            <Form.Item class="form-label" name="year" label="Year">
              <DatePicker
                class="form-input"
                picker="year"
                format="YYYY"
                value-format="YYYY"
                v-model:value="formData.year"
                placeholder="Select Year"
                style="width: 100%"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Flex>
  </Modal>
</template>

<style scoped>
:deep(.ant-form-item-label > label) {
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  color: var(--text-secondary);
  text-transform: uppercase;
}

.form-input {
  background: var(--bg);
}

:deep(.form-select .ant-select-selector) {
  height: 2rem !important;
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 0.75rem !important;
}

:deep(.form-select .ant-select-selection-item) {
  line-height: 2rem !important;
}

:deep(.form-select .ant-select-selection-placeholder) {
  line-height: 2rem !important;
}

:deep(.ant-form-item) {
  margin-bottom: 0.25rem;
}
</style>
