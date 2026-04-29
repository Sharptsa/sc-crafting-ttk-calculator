<script setup lang="ts">
import WeaponCollection from '@/data/WeaponCollection';
import { Weapon, WeaponClassEnum } from '@/models/Weapon';
import { BContainer, BRow, BInputGroup, BForm, BFormSelect, BFormSelectOption, BAccordion, BAccordionItem } from 'bootstrap-vue-next';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { ref } from 'vue';
import type { Ref } from 'vue'
import type FireMode from '@/models/FireMode';

const weaponCollection = new WeaponCollection()
const weaponStore = useWeaponsStore()

const weaponClassesOptions = ref(Object.values(WeaponClassEnum))
const weaponsOptions: Ref<Weapon[]> = ref([])
const weaponModesOptions: Ref<FireMode[]> = ref([])

const selectedWeaponClass = ref()
const selectedWeapon = ref()
const selectedWeaponMode = ref()

const selectWeaponClass = () => {
    weaponsOptions.value = weaponCollection.getWeaponsFromClass(<WeaponClassEnum>selectedWeaponClass.value)

    weaponStore.selectedWeapon = null
    weaponStore.selectedWeaponMode = null

    selectedWeapon.value = ''
    selectedWeaponMode.value = ''
}

const selectWeapon = () => {
    const weapon = weaponCollection.getWeaponFromName(selectedWeapon.value)

    weaponStore.selectedWeapon = weapon
    weaponModesOptions.value = weapon?.fireModes || []

    if (weaponModesOptions.value.length === 1) {
        selectedWeaponMode.value = weapon.fireModes[0]?.modeName ?? ''
        weaponStore.selectedWeaponMode = weapon.fireModes[0] ?? null
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
    <BAccordion>
        <BAccordionItem title="1. Select a weapon 🔫" :button-attrs="{ id: 'weapon-selector-button', disabled: true }" button-class="accordion-no-arrow"
            :show="true">
            <BContainer class="p-0">
                <BRow>
                    <BForm>
                        <BInputGroup>
                            <BFormSelect v-model="selectedWeaponClass" :options="weaponClassesOptions"
                                @update:model-value="selectWeaponClass()">
                                <template #first>
                                    <BFormSelectOption value="" disabled>&lt;-Weapon class-&gt;</BFormSelectOption>
                                </template>
                            </BFormSelect>
                            <BFormSelect v-model="selectedWeapon" :options="weaponsOptions" value-field="weaponName"
                                text-field="weaponName" :disabled="!selectedWeaponClass"
                                @update:model-value="selectWeapon()">
                                <template #first>
                                    <BFormSelectOption value="" disabled>&lt;-Weapon-&gt;</BFormSelectOption>
                                </template>
                            </BFormSelect>
                            <BFormSelect v-model="selectedWeaponMode" :options="weaponModesOptions"
                                value-field="modeName" text-field="modeName"
                                :disabled="!selectedWeaponClass || weaponModesOptions.length <= 1"
                                @update:model-value="selectWeaponMode()">
                                <template #first>
                                    <BFormSelectOption value="" disabled>&lt;-Firing mode-&gt;</BFormSelectOption>
                                </template>
                            </BFormSelect>
                        </BInputGroup>
                    </BForm>
                </BRow>
            </BContainer>
        </BAccordionItem>
    </BAccordion>
</template>

<style scoped lang="scss">
:deep(#weapon-selector-button) {
    font-size: 1.2rem
}
</style>
