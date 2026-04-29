<script setup lang="ts">
import { BCol, BRow, BInputGroup, BForm, BFormInput } from 'bootstrap-vue-next';
import { ref, watch, type ModelRef, type Ref } from 'vue';
import Volt from '@/models/DamageTypes/Volt';
import { clamp } from '@vueuse/core';
import type { Numberish } from 'bootstrap-vue-next/types/CommonTypes';
import FireMode from '@/models/FireMode';

const selectedWeaponMode: ModelRef<FireMode | null> = defineModel({ required: true })

const heat: Ref<number> = ref(0)

function heatFormatter(heat: string) {
    return String(clamp(Number(heat) as number, 0, 100))
}

function setHeat(heat: Numberish | null): void {
    if (selectedWeaponMode.value?.damageType instanceof Volt) {
        selectedWeaponMode.value.damageType.heat = Number(heat ?? 0)
    }
}

function hasSettableInitialParams(weaponMode: FireMode | null) {
    return weaponMode?.damageType instanceof Volt
}

watch(selectedWeaponMode, () => {
    heat.value = 0.0
})
</script>

<template>
    <BRow v-if="(hasSettableInitialParams(selectedWeaponMode))" class="mb-3">
        <h5>Initial weapon state</h5>
        <BCol>
            <BForm>
                <BInputGroup prepend="Heat">
                    <BFormInput class="i-size-6" type="number" min="0" max="100" step="1" v-model="heat"
                        :formatter="heatFormatter" @update:model-value="setHeat" />
                </BInputGroup>
            </BForm>
        </BCol>
    </BRow>
</template>

<style scoped lang="scss"></style>
