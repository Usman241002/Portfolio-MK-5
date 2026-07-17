<script setup>
import { onMounted, ref, watch } from 'vue'
import { Flex, Row, Col, Form, Input, Divider, Select, message } from 'ant-design-vue'
import BaseButton from '../portfolio/BaseButton.vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import useProfileStore from '@/stores/profileStore.js'

const profileStore = useProfileStore()

const formRef = ref(null)
const formData = ref({})

onMounted(async () => {
  await profileStore.fetchProfile()
})

watch(
  () => profileStore.profile,
  (newVal) => {
    formData.value = newVal ? { ...newVal } : {}
  },
  { immediate: true }
)

async function onSaveChanges() {
  try {
    await formRef.value.validate()
    await profileStore.updateProfile(formData.value)
    message.success('Profile updated successfully')
  } catch (error) {
    message.error(error)
  }
}

const rules = {
  name: [
    { required: true, message: 'Please enter your name' },
    { min: 4, message: 'Name must be more than 4 characters' },
  ],
  role: [
    { required: true, message: 'Please enter your role' },
    { min: 4, message: 'Role must be more than 4 characters' },
  ],
  location: [
    { required: true, message: 'Please enter your location' },
    { min: 4, message: 'Location must be more than 4 characters' }, // Fixed copy-paste typo here
  ],
  status: [{ required: true, message: 'Please select your status' }],
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email' },
  ],
  github_url: [{ min: 10, message: 'URL must be more than 10 characters' }],
  linkedin_url: [{ min: 10, message: 'URL must be more than 10 characters' }],
}
</script>

<template>
  <Teleport to="#header-actions" defer>
    <BaseButton @click="onSaveChanges">Save Changes</BaseButton>
  </Teleport>

  <Form ref="formRef" :model="formData" :rules="rules" layout="vertical">
    <Flex vertical>
      <Subtitle>Basic Info</Subtitle>
      <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />
      <Row :gutter="24">
        <Col :span="12">
          <Form.Item class="form-label" name="name" label="Name">
            <Input class="form-input" v-model:value="formData.name" />
          </Form.Item>
        </Col>
        <Col :span="12">
          <Form.Item class="form-label" name="role" label="Role">
            <Input class="form-input" v-model:value="formData.role" />
          </Form.Item>
        </Col>
        <Col :span="12">
          <Form.Item class="form-label" name="location" label="Location">
            <Input class="form-input" v-model:value="formData.location" />
          </Form.Item>
        </Col>
        <Col :span="12">
          <Form.Item class="form-label" name="status" label="Status">
            <Select
              v-model:value="formData.status"
              class="form-select"
              :options="[
                { value: 'open to work', label: 'Open to work' },
                { value: 'selective projects', label: 'Selective projects' },
                { value: 'not available', label: 'Not available' },
              ]"
            />
          </Form.Item>
        </Col>
      </Row>

      <Subtitle :style="{ marginTop: '0.75rem' }">Contacts and links</Subtitle>
      <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />
      <Row :gutter="24">
        <Col :span="12">
          <Form.Item class="form-label" name="email" label="Email">
            <Input class="form-input" v-model:value="formData.email" />
          </Form.Item>
        </Col>
        <Col :span="12">
          <Form.Item class="form-label" name="github_url" label="GitHub URL">
            <Input class="form-input" v-model:value="formData.github_url" />
          </Form.Item>
        </Col>
        <Col :span="12">
          <Form.Item class="form-label" name="linkedin_url" label="LinkedIn URL">
            <Input class="form-input" v-model:value="formData.linkedin_url" />
          </Form.Item>
        </Col>
      </Row>
    </Flex>
  </Form>
</template>
