<script setup lang="ts">
import { BAccordion, BAccordionItem, BContainer } from 'bootstrap-vue-next';
import { computed, type Ref } from 'vue';
import DamageTypeStatsFactory from './damage-type-stats/DamageTypeStatsFactory.vue';
import { storeToRefs } from 'pinia';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { accordionStateSaver } from '@/composables/accordion-state-save';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize()

const weaponStore = useWeaponsStore()

const selectedWeaponMode = storeToRefs(weaponStore).selectedWeaponMode

const statsReady: Ref<boolean> = computed(() => {
    return selectedWeaponMode.value !== null
})

const statsStateSaver = accordionStateSaver(statsReady, "stats-viewer", (width.value > 1190))

</script>

<template>
    <BAccordion>
        <BAccordionItem title="Weapon stats 📊" id="accordion-stats-viewer" @toggle="statsStateSaver.toggleState"
            v-model="statsStateSaver.accordionState.value"
            :button-attrs="{ id: 'weapon-stats-button', disabled: !statsReady }"
            :button-class="{ 'bg-dark-subtle': !statsReady }">
            <BContainer class="p-0" v-if="selectedWeaponMode">
                <div class="container">
                    <DamageTypeStatsFactory :damage-type="selectedWeaponMode.damageType" />
                </div>
            </BContainer>
        </BAccordionItem>
    </BAccordion>
</template>

<style scoped>
:deep(#weapon-stats-button) {
    font-size: 1.2rem
}
</style>
