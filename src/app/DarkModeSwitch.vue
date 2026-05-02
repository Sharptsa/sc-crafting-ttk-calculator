<script setup lang="ts">

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
    selector: 'html',
    attribute: 'data-theme',
    valueDark: 'sharp-dark',
    valueLight: 'sharp-light'
})

const toggleDark = useToggle(isDark)
</script>

<template>
    <label class="label text-sm text-base-content font-semibold">
        Dark Mode
        <input type="checkbox" v-model="isDark" @click="toggleDark()" class="toggle toggle-sm" />
    </label>
</template>
