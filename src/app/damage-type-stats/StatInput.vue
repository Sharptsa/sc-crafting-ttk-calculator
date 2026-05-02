<script setup lang="ts">
const props = defineProps({
    label: { type: String, required: true },
    value: { type: [String, Number], required: true },
    size: { type: String, required: true },
    apprend: { type: String, required: false },
})
</script>

<template>
    <label class="input w-fit">
        <span class="label text-base me-0 border-base-300-washed">{{ props.label }}</span>
        <input type="text" class="text-center" :value="props.value" :size="props.size" readonly />
        <span class="label text-base ms-0 px-2" v-if="props.apprend">{{ props.apprend }}</span>
    </label>
</template>
