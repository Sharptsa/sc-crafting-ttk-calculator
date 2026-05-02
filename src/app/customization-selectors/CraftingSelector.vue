<script setup lang="ts">

import { ref, watch, type ModelRef, type Ref } from 'vue';
import { clamp } from '@vueuse/core';
import ModHelper from '@/helpers/ModHelper';
import { Weapon } from '@/models/Weapon';

const selectedWeapon: ModelRef<Weapon | null> = defineModel({ required: true })

const craftingDmgPercent: Ref<number> = ref(0.00)

function setCraftingDmgMod(weapon: Weapon | null): void {
    if (weapon === null) {
        throw new Error("Weapon should have been selected by now")
    }

    craftingDmgPercent.value = Number(
        String(clamp(craftingDmgPercent.value, 0, ModHelper.toPercent(weapon.crafting.maxDmgMod)).toFixed(2))
    )
    weapon.crafting.dmgMod = ModHelper.toMod(Number(craftingDmgPercent.value))
}

const craftingFireRatePercent: Ref<number> = ref(0.00)

function setCraftingFireRateMod(weapon: Weapon | null): void {
    if (weapon === null) {
        throw new Error("Weapon should have been selected by now")
    }

    craftingFireRatePercent.value = Number(
        String(clamp(craftingFireRatePercent.value, 0, ModHelper.toPercent(weapon.crafting.maxFireRateMod)).toFixed(2))
    )

    weapon.crafting.fireRateMod = ModHelper.toMod(Number(craftingFireRatePercent.value))
}

watch(selectedWeapon, (newWeapon, oldWeapon) => {
    if (newWeapon !== oldWeapon && oldWeapon !== null) {
        craftingDmgPercent.value = 0.00
        craftingFireRatePercent.value = 0.00
        setCraftingDmgMod(oldWeapon)
        setCraftingFireRateMod(oldWeapon)
    }
})
</script>

<template>
    <div>
        <h3 class="text-base font-semibold mb-2">Crafting</h3>
        <label class="input mb-2 w-full">
            <span class="label text-base me-0 border-base-300-washed">Damage modifier</span>
            <input type="number" class="w-fit" min="0.00"
                :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxDmgMod).toFixed(2))" step="0.01"
                v-model="craftingDmgPercent" size="4" @input="setCraftingDmgMod(selectedWeapon)"
                :disabled="selectedWeapon?.crafting.maxDmgMod === null" />
            <span class="label text-base ms-0 px-1 border-x border-base-300-washed">%</span>
            <input type="range" class="range w-full range-sm [--range-fill:0]" min="0.00"
                :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxDmgMod).toFixed(2))" step="0.01"
                v-model="craftingDmgPercent" @input="setCraftingDmgMod(selectedWeapon)"
                :disabled="selectedWeapon?.crafting.maxDmgMod === null" />
        </label>
        <label class="input w-full">
            <span class="label text-base me-0 border-base-300-washed">Fire rate modifier</span>
            <input type="number" class="w-fit" min="0.00"
                :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxFireRateMod).toFixed(2))" step="0.01"
                v-model="craftingFireRatePercent" size="4" @input="setCraftingFireRateMod(selectedWeapon)"
                :disabled="selectedWeapon?.crafting.maxFireRateMod === null" />
            <span class="label text-base ms-0 px-1 border-x border-base-300-washed">%</span>
            <input type="range" class="range w-full range-sm [--range-fill:0]" min="0.00"
                :max="String(ModHelper.toPercent(selectedWeapon?.crafting.maxFireRateMod).toFixed(2))" step="0.01"
                v-model="craftingFireRatePercent" @input="setCraftingFireRateMod(selectedWeapon)"
                :disabled="selectedWeapon?.crafting.maxFireRateMod === null" />
        </label>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
