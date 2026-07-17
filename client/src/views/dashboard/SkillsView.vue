<script setup>
import { Flex, Divider } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue';
import SkillsTable from '@/components/dashboard/SkillsTable.vue'
</script>

<template>

  <Flex class="dash-container" vertical>
    <Subtitle>Skills List</Subtitle>
    <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />

    <SkillsTable />

  </Flex>
</template>
