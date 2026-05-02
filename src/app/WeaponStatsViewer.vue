<script setup lang="ts">
import { computed, type Ref } from 'vue';
import DamageTypeStatsFactory from './damage-type-stats/DamageTypeStatsFactory.vue';
import { storeToRefs } from 'pinia';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { collapseStateSaver } from '@/composables/collapse-state-save';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize()

const weaponStore = useWeaponsStore()

const selectedWeaponMode = storeToRefs(weaponStore).selectedWeaponMode

const statsReady: Ref<boolean> = computed(() => {
    return selectedWeaponMode.value !== null
})

const stateSaver = collapseStateSaver("stats-viewer", statsReady, (width.value > 1190))
</script>

<template>
    <div class="collapse collapse-arrow bg-base-100 border-base-300 border grow"
        :class="{ 'collapse-open': stateSaver.collapseState.value }">
        <input type="checkbox" class="peer" :checked="stateSaver.collapseState.value" @change="stateSaver.toggleState"
            :class="{ 'cursor-not-allowed': !statsReady }" :disabled="!statsReady" />
        <h2 class="collapse-title text-lg py-3 bg-base-100 peer-checked:bg-primary peer-checked:text-primary-content text-base-content peer-checked:border-b border-base-300 "
            :class="{ 'bg-neutral': !statsReady }">
            Weapon stats 📊
        </h2>

        <div class="collapse-content grow peer-checked:p-4">
            <form>
                <DamageTypeStatsFactory v-if="selectedWeaponMode" :damage-type="selectedWeaponMode.damageType" />
            </form>
        </div>
    </div>
</template>

<style scoped></style>
