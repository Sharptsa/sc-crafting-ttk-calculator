<script setup lang="ts">

import { ref, watch, type ModelRef, type Ref } from 'vue';
import ModHelper from '@/helpers/ModHelper';
import { Weapon } from '@/models/Weapon';
import Crafting from '@/models/Crafting';

const selectedWeapon: ModelRef<Weapon | null> = defineModel({ required: true })

const craftingDmgLevel: Ref<number> = ref(0)
const craftingDmgPercent: Ref<string> = ref('0.00')

function setCraftingDmgMod(weapon: Weapon | null): void {
    if (weapon === null) {
        throw new Error("Weapon should have been selected by now")
    }

    const dmgMod = weapon.crafting.getDmgModFromLevel(craftingDmgLevel.value)
    weapon.crafting.dmgMod = dmgMod

    craftingDmgPercent.value = ModHelper.toPercent(dmgMod).toFixed(2)

    if (weapon.crafting.linked && craftingDmgLevel.value !== craftingFireRateLevel.value) {
        craftingFireRateLevel.value = craftingDmgLevel.value
        setCraftingFireRateMod(weapon)
    }
}

const craftingFireRateLevel: Ref<number> = ref(0)
const craftingFireRatePercent: Ref<string> = ref('0.00')

function setCraftingFireRateMod(weapon: Weapon | null): void {
    if (weapon === null) {
        throw new Error("Weapon should have been selected by now")
    }

    const fireRateMod = weapon.crafting.getFireRateModFromLevel(craftingFireRateLevel.value)
    weapon.crafting.fireRateMod = fireRateMod

    craftingFireRatePercent.value = ModHelper.toPercent(fireRateMod).toFixed(2)

    if (weapon.crafting.linked && craftingFireRateLevel.value !== craftingDmgLevel.value) {
        craftingDmgLevel.value = craftingFireRateLevel.value
        setCraftingDmgMod(weapon)
    }
}

watch(selectedWeapon, (newWeapon, oldWeapon) => {
    if (newWeapon !== oldWeapon && oldWeapon !== null) {
        craftingDmgLevel.value = 0
        craftingFireRateLevel.value = 0
        setCraftingDmgMod(oldWeapon)
        setCraftingFireRateMod(oldWeapon)
    }
})
</script>

<template>
    <div>
        <h3 class="text-base font-semibold mb-3">Crafting</h3>
        <div class="mb-12 flex flex-wrap sm:flex-nowrap xl:flex-wrap 2xl:flex-nowrap">
            <label class="input mb-2 me-2 w-fit">
                <span class="label text-base me-0 border-base-300-washed">Damage modifier</span>
                <input type="text" class="w-fit" :value="craftingDmgPercent" size="4"
                    :disabled="selectedWeapon?.crafting.maxDmgMod === null" readonly />
                <span class="label text-base ms-0 px-1 border-s border-base-300-washed">%</span>
            </label>
            <label class="input w-full">
                <span class="label text-base me-0 border-base-300-washed">Quality</span>
                <div class="block w-full mt-9">
                    <input type="range" class="range w-full range-sm [--range-fill:0] mt-2" min="0" max="7" step="1"
                        v-model="craftingDmgLevel" @input="setCraftingDmgMod(selectedWeapon)"
                        :disabled="selectedWeapon?.crafting.maxDmgMod === null" />

                    <div class="flex justify-between px-2.5 text-xs mt-2 -mx-0.5">
                        <span v-for="n in 8" v-bind:key="n">|</span>
                    </div>
                    <div class="flex justify-between px-2.5 mt-1 text-xs -ms-2.5 -me-4">
                        <span>500</span>
                        <span>521</span>
                        <span>664</span>
                        <span>710</span>
                        <span>874</span>
                        <span>907</span>
                        <span>970</span>
                        <span class="-ms-1 me-1">1000</span>
                    </div>
                </div>
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
                <div class="block w-full mt-9">
                    <input type="range" class="range w-full range-sm [--range-fill:0] mt-2" min="0" max="7" step="1"
                        v-model="craftingFireRateLevel" @input="setCraftingFireRateMod(selectedWeapon)"
                        :disabled="selectedWeapon?.crafting.maxFireRateMod === null" />

                    <div class="flex justify-between px-2.5 text-xs mt-2 -mx-0.5">
                        <span v-for="(_, index) in Crafting.LEVEL_QUALITY_MAP" v-bind:key="index">|</span>
                    </div>
                    <div class="flex justify-between px-2.5 mt-1 text-xs -ms-2.5 -me-4">
                        <span>500</span>
                        <span>521</span>
                        <span>664</span>
                        <span>710</span>
                        <span>874</span>
                        <span>907</span>
                        <span>970</span>
                        <span class="-ms-1 me-1">1000</span>
                    </div>
                </div>
            </label>
        </div>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
