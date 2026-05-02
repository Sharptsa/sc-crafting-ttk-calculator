<script setup lang="ts">

import { onBeforeUnmount, ref, type ModelRef, type Ref } from 'vue';
import Volt from '@/models/DamageTypes/Volt';
import { clamp } from '@vueuse/core';

import FireMode from '@/models/FireMode';

const selectedWeaponMode: ModelRef<FireMode | null> = defineModel({required: true})

const heat: Ref<number> = ref(0)

function setHeat(): void {
    if (!selectedWeaponMode.value) {
        throw new Error("Weapon fire mode should have been selected by now")
    }

    const heatValue = clamp(heat.value, 0, 100)
    heat.value = heatValue
    if (selectedWeaponMode.value.damageType instanceof Volt) {
        selectedWeaponMode.value.damageType.heat = Number(heatValue ?? 0)
    }
}

onBeforeUnmount(() => {
    heat.value = 0.00
    setHeat()
})
</script>

<template>
    <div v-if="selectedWeaponMode?.damageType instanceof Volt">
        <h3 class="text-base font-semibold mb-2">Initial weapon state</h3>
        <label class="input w-fit">
            <span class="label text-base me-0">Heat</span>
            <input type="number" min="0" max="100" step="1" v-model="heat" size="3" @input="setHeat()" />
        </label>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
