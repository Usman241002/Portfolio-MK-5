<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useSkillStore from '@/stores/skillStore.js'

const skillStore = useSkillStore()
const { skills } = storeToRefs(skillStore)

onMounted(async () => {
  await skillStore.fetchSkills()
  console.log('skills:', JSON.stringify(skills.value, null, 2))
})
</script>

<template>
  <div class="skills-grid">
    <div v-for="skill in skills" :key="skill.name" class="skill-row">
      <span class="skill-name">{{ skill.name }}</span>
      <span class="skill-years">
        {{ new Date().getFullYear() - skill.year }} year{{ new Date().getFullYear() - skill.year !== 1 ? 's' : '' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
}

/* right border on left column only */
.skill-row:nth-child(odd) {
  border-right: 1px solid var(--border);
}

.skill-name {
  font: var(--body);
  color: var(--text-primary);
  font-weight: 700;
}

.skill-years {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  color: var(--text-secondary);
}

/* --- Responsive Styles --- */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skill-row {
    /* Slightly reduced padding for mobile */
    padding: 1rem;
  }

  .skill-row:nth-child(odd) {
    /* Removes the middle border since it's just one column now */
    border-right: none;
  }
}
</style>
