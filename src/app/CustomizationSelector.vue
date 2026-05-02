<script setup lang="ts">
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { computed, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import InitialParametersSelector from './customization-selectors/InitialStateSelector.vue';
import CraftingSelector from './customization-selectors/CraftingSelector.vue';
import AttachmentsSelector from './customization-selectors/AttachmentsSelector.vue';
import { collapseStateSaver } from '@/composables/collapse-state-save';
import Volt from '@/models/DamageTypes/Volt';

const { selectedWeapon, selectedWeaponMode } = storeToRefs(useWeaponsStore())

const customizationReady: Ref<boolean> = computed(() => {
    return selectedWeaponMode.value !== null
})

const stateSaver = collapseStateSaver("customize-selector", customizationReady)

const hasSettableInitialParams: Ref<boolean> = computed(() => {
    return selectedWeaponMode.value?.damageType instanceof Volt
})
</script>

<template>
    <div class="collapse collapse-arrow bg-base-100 border-base-300 border grow"
        :class="{ 'collapse-open': stateSaver.collapseState.value }">
        <input type="checkbox" class="peer" :checked="stateSaver.collapseState.value" @change="stateSaver.toggleState"
            :class="{ 'cursor-not-allowed': !customizationReady }" :disabled="!customizationReady" />
        <h2 class="collapse-title text-lg py-3 bg-base-100 peer-checked:bg-primary peer-checked:text-primary-content text-base-content peer-checked:border-b border-base-300 "
            :class="{ 'bg-neutral': !customizationReady }">
            2. Weapon customization 🛠️
        </h2>

        <div class="collapse-content grow peer-checked:p-4">
            <template v-if="(hasSettableInitialParams)">
                <InitialParametersSelector v-model="selectedWeaponMode" :select-weapon="selectedWeapon" />
                <hr class="text-base-300-washed my-3">
            </template>
            <CraftingSelector v-model="selectedWeapon" />
            <hr class="text-base-300-washed my-3">
            <AttachmentsSelector v-model="selectedWeapon" />
        </div>
    </div>
</template>

<style scoped></style>
