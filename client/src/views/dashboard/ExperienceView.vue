<script setup>
import { onMounted } from 'vue'
import { Flex, Divider } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import ExperienceTable from '@/components/dashboard/ExperienceTable.vue'

import useExperienceStore from '@/stores/experienceStore.js'
const experienceStore = useExperienceStore()

onMounted(async () => {
  await experienceStore.fetchExperiences()
})

</script>

<template>
  <Flex class="dash-container" vertical>
    <Subtitle>Experience timeline</Subtitle>
    <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />

    <ExperienceTable />
  </Flex>
</template>

<style scoped>
.timeline-card {
  border-radius: 0;
  background-color: var(--bg);
}

.timeline-header {
  background-color: var(--surface);
  border: 1px solid var(--border);
  margin-bottom: 1rem;
}

.timeline-header p {
  font: var(--body);
  color: var(--accent);
}

.timeline-header span {
  font-weight: bold;
  color: var(--text-primary);
}
</style>
