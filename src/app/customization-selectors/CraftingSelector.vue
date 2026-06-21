<script setup lang="ts">

import { ref, watch, type ModelRef, type Ref } from 'vue';
import ModHelper from '@/helpers/ModHelper';
import { Weapon } from '@/models/Weapon';

const selectedWeapon: ModelRef<Weapon | null> = defineModel({ required: true })

const craftingDmgQuality: Ref<number> = ref(500)
const craftingDmgPercent: Ref<string> = ref('0.00')

function setCraftingDmgMod(weapon: Weapon | null): void {
    if (weapon === null) {
        throw new Error("Weapon should have been selected by now")
    }

    const dmgMod = weapon.crafting.getDmgModFromQuality(craftingDmgQuality.value)
    weapon.crafting.dmgMod = dmgMod

    craftingDmgPercent.value = ModHelper.toPercent(dmgMod).toFixed(2)

    if (weapon.crafting.linked && craftingDmgQuality.value !== craftingFireRateQuality.value) {
        craftingFireRateQuality.value = craftingDmgQuality.value
        setCraftingFireRateMod(weapon)
    }
}

const craftingFireRateQuality: Ref<number> = ref(500)
const craftingFireRatePercent: Ref<string> = ref('0.00')

function setCraftingFireRateMod(weapon: Weapon | null): void {
    if (weapon === null) {
        throw new Error("Weapon should have been selected by now")
    }

    const fireRateMod = weapon.crafting.getFireRateModFromQuality(craftingFireRateQuality.value)
    weapon.crafting.fireRateMod = fireRateMod

    craftingFireRatePercent.value = ModHelper.toPercent(fireRateMod).toFixed(2)

    if (weapon.crafting.linked && craftingFireRateQuality.value !== craftingDmgQuality.value) {
        craftingDmgQuality.value = craftingFireRateQuality.value
        setCraftingDmgMod(weapon)
    }
}

watch(selectedWeapon, (newWeapon, oldWeapon) => {
    if (newWeapon !== oldWeapon && oldWeapon !== null) {
        craftingDmgQuality.value = 0
        craftingFireRateQuality.value = 0
        setCraftingDmgMod(oldWeapon)
        setCraftingFireRateMod(oldWeapon)
    }
})
</script>

<template>
    <div>
        <h3 class="text-base font-semibold mb-3">Crafting</h3>
        <div class="flex flex-wrap sm:flex-nowrap xl:flex-wrap 2xl:flex-nowrap">
            <label class="input mb-2 me-2 w-fit">
                <span class="label text-base me-0 border-base-300-washed">Damage modifier</span>
                <input type="text" class="w-fit" :value="craftingDmgPercent" size="4"
                    :disabled="selectedWeapon?.crafting.maxDmgMod === null" readonly />
                <span class="label text-base ms-0 px-1 border-s border-base-300-washed">%</span>
            </label>
            <label class="input w-full">
                <span class="label text-base me-0 border-base-300-washed">Quality</span>
                <input type="text" class="w-fit pe-2 border-e border-base-300-washed" v-model="craftingDmgQuality" size="3" @input="setCraftingDmgMod(selectedWeapon)" />
                <input type="range" class="range w-full range-sm [--range-fill:0]" min="500" max="1000" step="1"
                        v-model="craftingDmgQuality" @input="setCraftingDmgMod(selectedWeapon)"
                        :disabled="selectedWeapon?.crafting.maxDmgMod === null" />
            </label>
        </div>

        <div class="mb-12 flex flex-wrap sm:flex-nowrap xl:flex-wrap 2xl:flex-nowrap">
            <label class="input mb-2 me-2 w-fit ">
                <span class="label text-base me-0 border-base-300-washed">Fire rate modifier</span>
                <input type="text" class="w-fit" size="4" :value="craftingFireRatePercent"
                    :disabled="selectedWeapon?.crafting.maxFireRateMod === null" readonly />
                <span class="label text-base ms-0 px-1 border-s border-base-300-washed">%</span>
            </label>
            <label class="input w-full">
                <span class="label text-base me-0 border-base-300-washed">Quality</span>
                <input type="text" class="w-fit pe-2 border-e border-base-300-washed" v-model="craftingFireRateQuality" size="3" @input="setCraftingFireRateMod(selectedWeapon)" />
                    <input type="range" class="range w-full range-sm [--range-fill:0]" min="500" max="1000" step="1"
                        v-model="craftingFireRateQuality" @input="setCraftingFireRateMod(selectedWeapon)"
                        :disabled="selectedWeapon?.crafting.maxFireRateMod === null" />
            </label>
        </div>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
