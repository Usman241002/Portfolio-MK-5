<script setup>
import { Card, Flex } from 'ant-design-vue'
import Badge from '@/components/portfolio/Badge.vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/config.js'

const router = useRouter()

const { project, type = 'standard' } = defineProps({
  type: String,
  project: Object,
})
</script>

<template>
  <Card class="project-card" @click="router.push(`/projects/${project.id}`)">
    <template v-if="type === 'cover'" #cover>
      <div v-if="project.thumbnail_url" class="project-cover">
        <img alt="" :src="`${API_URL}${project.thumbnail_url}`" />
      </div>

      <div v-else class="project-cover project-cover-placeholder">
        <span>project_{{ project.id }}</span>
      </div>
    </template>

    <Flex gap="8" vertical>
      <p class="project-id">project_{{ project.id }}.tsx</p>

      <h6 class="project-title">
        {{ project.title }}
      </h6>

      <p class="project-description">
        {{ project.subtitle }}
      </p>

      <Flex gap="12">
        <Badge v-for="skill in project.skills" :key="skill">
          {{ skill.name }}
        </Badge>
      </Flex>
    </Flex>
  </Card>
</template>

<style>
.project-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.project-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-cover-placeholder {
  display: flex !important;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: var(--bg);
  color: var(--accent);
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  text-transform: lowercase;
}

.project-cover-placeholder span {
  opacity: 0.7;
}

.project-card {
  border-radius: 0;
  border: 1px solid var(--text-primary);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  overflow: hidden;
}

.project-card:hover {
  cursor: pointer;
  transform: translateY(-0.25rem);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.project-id {
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  text-transform: lowercase;
  color: var(--accent);
}

.project-title {
  font: var(--body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.project-description {
  font: var(--body);
  color: var(--text-secondary);
}
</style>
