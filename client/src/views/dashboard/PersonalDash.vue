<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu } from 'ant-design-vue'

import Header from '@/components/dashboard/Header.vue'

import SkillsView from './SkillsView.vue'
import IdentityView from './IdentityView.vue'
import ExperienceView from './ExperienceView.vue'
import EducationView from './EducationView.vue'

const route = useRoute()
const router = useRouter()

const current = ref(['1'])

const tabs = [
  { key: '1', slug: 'identity',   label: 'Identity',   component: IdentityView },
  { key: '2', slug: 'skills',     label: 'Skills',     component: SkillsView },
  { key: '3', slug: 'experience', label: 'Experience', component: ExperienceView },
  { key: '4', slug: 'education',  label: 'Education',  component: EducationView },
]

const menuItems = tabs.map(tab => ({ label: tab.label, key: tab.key }))

const activeComponent = computed(() => {
  const activeTab = tabs.find(tab => tab.key === current.value[0])
  return activeTab ? activeTab.component : IdentityView
})

function syncTab() {
  const tabQuery = route.query.tab
  const matchedTab = tabs.find(tab => tab.slug === tabQuery)

  if (matchedTab) {
    current.value = [matchedTab.key]
  } else {
    current.value = ['1']
  }
}

onMounted(() => {
  syncTab()
})

watch(
  () => route.query.tab,
  () => {
    syncTab()
  }
)

function onTabClick({ key }) {
  const targetTab = tabs.find(tab => tab.key === key)
  if (targetTab) {
    router.push({ query: { ...route.query, tab: targetTab.slug } })
  }
}
</script>

<template>
  <Header title="Personal Data">
    <div id="header-actions"></div>
  </Header>

  <Menu
    v-model:selectedKeys="current"
    mode="horizontal"
    :items="menuItems"
    @click="onTabClick"
    :style="{
      width: '100%',
      padding: '0  var(--space-md)',
      border: '1px solid var(--border)',
      textTransform: 'uppercase',
      font: 'var(--label)',
      letterSpacing: 'var(--label-tracking)',
      lineHeight: '2.5rem',
    }"
  />

  <component :is="activeComponent" />
</template>
