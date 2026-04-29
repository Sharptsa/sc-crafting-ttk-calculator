<script setup lang="ts">
import { BFormCheckbox } from 'bootstrap-vue-next';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
    selector: 'html',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light'
})

const toggleDark = useToggle(isDark)
</script>

<template>
    <BFormCheckbox switch v-model="isDark" @click="toggleDark()"><strong>Dark Mode</strong></BFormCheckbox>
</template>
