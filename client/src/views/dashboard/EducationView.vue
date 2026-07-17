<script setup>
import { onMounted } from 'vue'
import { Flex, Divider } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'

import useEducationStore from '@/stores/educationStore.js'
import EducationTable from '@/components/dashboard/EducationTable.vue'
const educationStore = useEducationStore()

onMounted(async () => {
  await educationStore.fetchEducation()
})

</script>

<template>
  <Flex class="dash-container" vertical>
    <Subtitle>Education timeline</Subtitle>
    <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />

    <EducationTable />

  </Flex>
</template>
