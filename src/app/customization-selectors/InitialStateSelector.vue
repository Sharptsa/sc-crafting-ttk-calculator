<script setup lang="ts">

import { onBeforeUnmount, ref, type ModelRef, type Ref } from 'vue';
import Volt from '@/models/DamageTypes/Volt';
import { clamp } from '@vueuse/core';

import FireMode from '@/models/FireMode';

const selectedWeaponMode: ModelRef<FireMode | null> = defineModel({ required: true })

const heat: Ref<number> = ref(0)
const airTemp: Ref<number> = ref(20)


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

function setAirTemp(): void {
    if (!selectedWeaponMode.value) {
        throw new Error("Weapon fire mode should have been selected by now")
    }

    const airTempValue = clamp(airTemp.value, -273, 350)
    airTemp.value = airTempValue
    if (selectedWeaponMode.value.damageType instanceof Volt) {
        selectedWeaponMode.value.damageType.airTemp = Number(airTempValue ?? 0)
        selectedWeaponMode.value.damageType.updateHeatIncrements()
    }
}

function resetState(): void {
    heat.value = 0
    setHeat()
    airTemp.value = 20
    setAirTemp()
}

onBeforeUnmount(() => {
    resetState()
})
</script>

<template>
    <div>
        <h3 class="text-base font-semibold mb-2">Initial weapon state</h3>
        <div class="flex gap-2">
            <label class="input w-fit">
                <span class="label text-base me-0">Heat</span>
                <input type="number" min="0" max="100" step="1" v-model="heat" size="3" @input="setHeat()" />
            </label>
            <label class="input w-fit">
                <span class="label text-base me-0">Air temp.</span>
                <input type="number" min="-250" max="500" step="1" v-model="airTemp" size="4" @input="setAirTemp()" />
                <span class="label text-base ms-0 px-2">°C</span>
            </label>
            <button class="btn" @click="resetState()">Reset</button>
        </div>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>

updateHeatPerFire
