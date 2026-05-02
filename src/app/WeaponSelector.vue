<script setup lang="ts">
import WeaponCollection from '@/data/WeaponCollection';
import { Weapon, WeaponClassEnum } from '@/models/Weapon';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { ref } from 'vue';
import type { Ref } from 'vue'
import type FireMode from '@/models/FireMode';

const weaponCollection = new WeaponCollection()
const weaponStore = useWeaponsStore()

const weaponClassesOptions = ref(Object.values(WeaponClassEnum))
const weaponsOptions: Ref<Weapon[]> = ref([])
const weaponModesOptions: Ref<FireMode[]> = ref([])

const selectedWeaponClass: Ref<string> = ref('')
const selectedWeapon: Ref<string> = ref('')
const selectedWeaponMode: Ref<string> = ref('')

const selectWeaponClass = () => {
    weaponsOptions.value = weaponCollection.getWeaponsFromClass(<WeaponClassEnum>selectedWeaponClass.value)

    if (weaponsOptions.value.length === 1 && weaponsOptions.value[0]) {
        selectedWeapon.value = weaponsOptions.value[0].weaponName
        selectWeapon()
    } else {
        weaponStore.selectedWeapon = null
        weaponStore.selectedWeaponMode = null

        selectedWeapon.value = ''
        selectedWeaponMode.value = ''
    }

}

const selectWeapon = () => {
    const weapon = weaponCollection.getWeaponFromName(selectedWeapon.value)

    weaponStore.selectedWeapon = weapon
    weaponModesOptions.value = weapon?.fireModes || []

    if (weaponModesOptions.value.length === 1) {
        selectedWeaponMode.value = weapon.fireModes[0]?.modeName ?? ''
        selectWeaponMode()
    } else {
        selectedWeaponMode.value = ''
        weaponStore.selectedWeaponMode = null
    }
}

const selectWeaponMode = () => {
    if (weaponStore.selectedWeapon === null) {
        weaponStore.selectedWeaponMode = null
        return
    }

    weaponStore.selectedWeaponMode = weaponStore.selectedWeapon.fireModes.find((weaponMode: FireMode) => {
        return weaponMode.modeName === selectedWeaponMode.value
    }) ?? null
}

</script>

<template>
    <div class="bg-base-100 border-base-300 collapse collapse-open border grow">
        <h2 class="collapse-title bg-primary text-primary-content text-lg border-base-300 border-b cursor-default py-3">
            1. Select a weapon 🔫
        </h2>
        <div class="collapse-content p-4">
            <form>
                <div class="join w-full">
                    <select class="select join-item sm:text-base w-full" v-model="selectedWeaponClass"
                        @change="selectWeaponClass">
                        <option disabled selected value="">&lt;-Weapon class-&gt;</option>
                        <option v-for="(weaponClass, index) in weaponClassesOptions" v-bind:key="index"
                            :value="weaponClass">{{ weaponClass }}</option>
                    </select>
                    <select class="select join-item sm:text-base w-full" v-model="selectedWeapon"
                        :class="{ 'text-base-content': selectedWeapon }"
                        :disabled="!selectedWeaponClass || weaponsOptions.length <= 1" @change="selectWeapon">
                        <option disabled selected value="">&lt;-Weapon-&gt;</option>
                        <option v-for="(weapon, index) in weaponsOptions" v-bind:key="index" :value="weapon.weaponName">
                            {{ weapon.weaponName }}</option>
                    </select>
                    <select class="select join-item sm:text-base w-full" v-model="selectedWeaponMode"
                        :class="{ 'text-base-content': selectedWeaponMode }"
                        :disabled="!selectedWeaponClass || weaponModesOptions.length <= 1" @change="selectWeaponMode">
                        <option disabled selected value="">&lt;-Firing mode-&gt;</option>
                        <option v-for="(weaponMode, index) in weaponModesOptions" v-bind:key="index"
                            :value="weaponMode.modeName">{{ weaponMode.modeName }}</option>
                    </select>
                </div>

            </form>
        </div>
    </div>
</template>

<style scoped></style>
