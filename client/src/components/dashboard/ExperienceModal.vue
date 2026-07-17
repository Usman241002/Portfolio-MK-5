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
  Select,
  DatePicker,
  Button,
  message,
} from 'ant-design-vue'
import Subtitle from '../portfolio/Subtitle.vue'
import useExperienceStore from '@/stores/experienceStore.js'

const props = defineProps({
  modalVisible: Boolean,
  experience: {
    type: [Object, null],
    required: true,
  },
})

const emit = defineEmits(['update:modalVisible', 'save'])
const close = () => emit('update:modalVisible', false)

const experienceStore = useExperienceStore()

const formData = ref({})
const formRef = ref(null)

watch(
  () => props.experience,
  (newVal) => {
    formData.value = newVal ? { ...newVal } : {}
  },
  { immediate: true }
)

const isEditing = computed(() => {
  if (!formData.value.id) return false
  return experienceStore.experiences.some((e) => e.id === formData.value.id)
})

async function onSave() {
  try {
    await formRef.value.validate()

    experienceStore.setCurrentExperience(formData.value)

    if (isEditing.value) {
      await experienceStore.updateExperience()
    } else {
      await experienceStore.createExperience()
    }

    message.success(`Experience ${isEditing.value ? 'updated' : 'created'} successfully`)
    emit('save')
    close()
  } catch (error) {
    message.error(error)
  }
}

const rules = {
  start_date: [
    {
      required: true,
      message: 'Please select a start date',
    },
    {
      type: 'date',
      message: 'Please select a valid start date',
    },
  ],
  end_date: [
    {
      type: 'date',
      message: 'Please select a valid end date',
    },
  ],
  title: [
    {
      required: true,
      message: 'Please enter a job title',
    },
    {
      max: 255,
      message: 'Title cannot exceed 255 characters',
    },
  ],
  company: [
    {
      required: true,
      message: 'Please enter a company name',
    },
    {
      max: 255,
      message: 'Company name cannot exceed 255 characters',
    },
  ],
  employment_type: [
    {
      required: true,
      message: 'Please select an employment type',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please enter a location',
    },
    {
      max: 255,
      message: 'Location cannot exceed 255 characters',
    },
  ],
  description: [
    {
      max: 1000,
      message: 'Description cannot exceed 1000 characters',
    },
  ],
}
</script>

<template>
  <Modal
    :open="modalVisible"
    @cancel="close"
    :title="isEditing ? 'Edit Experience' : 'New Experience'"
    width="45%"
    centered
  >

    <template #footer>
      <Flex gap="16" justify="end">
        <Button @click="close">Cancel</Button>
        <Button @click="onSave" type="primary" :disabled="!experience">
          {{ isEditing ? 'Update' : 'Create' }}
        </Button>
      </Flex>
    </template>

    <Flex
      v-if="experience"
      vertical
      :style="{ overflowY: 'auto', overflowX: 'hidden', minHeight: '30vh', maxHeight: '70vh' }"
    >
      <Subtitle>Experience Info</Subtitle>
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
          <Col :span="6">
            <Form.Item class="form-label" name="start_date" label="Start Date">
              <DatePicker
                class="form-input"
                format="MM-YYYY"
                value-format="YYYY-MM-DD"
                v-model:value="formData.start_date"
                style="width: 100%"
              />
            </Form.Item>
          </Col>

          <Col :span="6">
            <Form.Item class="form-label" name="end_date" label="End Date">
              <DatePicker
                class="form-input"
                format="MM-YYYY"
                value-format="YYYY-MM-DD"
                v-model:value="formData.end_date"
                placeholder="Present"
                style="width: 100%"
              />
            </Form.Item>
          </Col>

          <Col :span="12" />

          <Col :span="12">
            <Form.Item class="form-label" name="title" label="Title">
              <Input class="form-input" v-model:value="formData.title" />
            </Form.Item>
          </Col>

          <Col :span="12">
            <Form.Item class="form-label" name="employment_type" label="Employment Type">
              <Select
                v-model:value="formData.employment_type"
                class="form-select"
                :options="[
                  { value: 'full-time', label: 'Full-time' },
                  { value: 'part-time', label: 'Part-time' },
                  { value: 'internship', label: 'Internship' },
                  { value: 'contract', label: 'Contract' },
                  { value: 'freelance', label: 'Freelance' },
                ]"
              />
            </Form.Item>
          </Col>

          <Col :span="12">
            <Form.Item class="form-label" name="company" label="Company">
              <Input class="form-input" v-model:value="formData.company" />
            </Form.Item>
          </Col>

          <Col :span="12">
            <Form.Item class="form-label" name="location" label="Location">
              <Input class="form-input" v-model:value="formData.location" />
            </Form.Item>
          </Col>

          <Col :span="24">
            <Form.Item class="form-label" name="description" label="Description">
              <Input.TextArea
                class="form-input"
                v-model:value="formData.description"
                :style="{ height: '5rem', resize: 'none' }"
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
