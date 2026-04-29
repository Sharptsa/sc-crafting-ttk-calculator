<script setup lang="ts">
import { BCol, BRow, BInputGroup, BFormInput, BForm } from 'bootstrap-vue-next';
import { ref, watch, type ModelRef, type Ref } from 'vue';
import { clamp } from '@vueuse/core';
import type { Numberish } from 'bootstrap-vue-next/types/CommonTypes';
import ModHelper from '@/helpers/ModHelper';
import { Weapon } from '@/models/Weapon';
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const selectedWeapon: ModelRef<Weapon | null> = defineModel({ required: true })

const craftingDmgPercent: Ref<number> = ref(0.00)

function craftingDmgPercentFormatter(dmgPercent: string) {
    return String(
        clamp(Number(dmgPercent), 0, ModHelper.toPercent(selectedWeapon.value?.crafting.maxDmgMod)).toFixed(2)
    )
}

function setCraftingDmgMod(dmgPercent: Numberish | null): void {
    if (selectedWeapon.value === null) {
        throw new Error("Weapon should have been selected by now")
    }
    selectedWeapon.value.crafting.dmgMod = ModHelper.toMod(Number(dmgPercent ?? 0))
}

const craftingFireRatePercent: Ref<number> = ref(0.00)

function craftingFireRateModFormatter(fireRatePercent: string) {
    return String(
        clamp(Number(fireRatePercent), 0, ModHelper.toPercent(selectedWeapon.value?.crafting.maxFireRateMod)).toFixed(2)
    )
}

function setCraftingFireRateMod(fireRatePercent: Numberish | null): void {
    if (selectedWeapon.value === null) {
        throw new Error("Weapon should have been selected by now")
    }
    selectedWeapon.value.crafting.fireRateMod = ModHelper.toMod(Number(fireRatePercent ?? 0))
}

watch(selectedWeapon, () => {
    craftingDmgPercent.value = 0.00
    craftingFireRatePercent.value = 0.00
})
</script>

<template>
    <BRow class="mb-3">
        <h5 class="mb-3">Crafting</h5>
        <BRow class="mb-2 g-xs-1">
            <BCol>
                <BForm>
                    <BInputGroup prepend="Damage modifier" append="%">
                        <BFormInput class="i-size-7" type="number" min="0.00"
                            :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxDmgMod).toFixed(2))"
                            step="0.01" v-model="craftingDmgPercent" :formatter="craftingDmgPercentFormatter"
                            @update:model-value="setCraftingDmgMod"
                            :disabled="selectedWeapon?.crafting.maxDmgMod === null" />
                        <BFormInput class="ps-1 pe-1" type="range" min="0"
                            :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxDmgMod).toFixed(2))"
                            step="0.01" v-model="craftingDmgPercent" :formatter="craftingDmgPercentFormatter"
                            @update:model-value="setCraftingDmgMod"
                            :disabled="selectedWeapon?.crafting.maxDmgMod === null"
                            v-show="width > 580" />
                    </BInputGroup>
                </BForm>
            </BCol>
        </BRow>
        <BRow>
            <BCol>
                <BForm>
                    <BInputGroup prepend="Fire rate modifier" append="%">
                        <BFormInput class="i-size-7" type="number" min="0.00"
                            :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxFireRateMod))" step="0.1"
                            v-model="craftingFireRatePercent" :formatter="craftingFireRateModFormatter"
                            @update:model-value="setCraftingFireRateMod"
                            :disabled="selectedWeapon?.crafting.maxFireRateMod === null" />
                        <BFormInput class="ps-1 pe-1" type="range" min="0"
                            :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxFireRateMod))" step="0.1"
                            v-model="craftingFireRatePercent" :formatter="craftingFireRateModFormatter"
                            @update:model-value="setCraftingFireRateMod"
                            :disabled="selectedWeapon?.crafting.maxFireRateMod === null"
                            v-show="width > 580" />
                    </BInputGroup>
                </BForm>
            </BCol>
        </BRow>
    </BRow>
</template>

<style scoped lang="scss"></style>
