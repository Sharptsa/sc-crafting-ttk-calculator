<script setup lang="ts">
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { BAccordion, BAccordionItem, BContainer } from 'bootstrap-vue-next';
import { computed, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import InitialParametersSelector from './customization-selectors/InitialStateSelector.vue';
import CraftingSelector from './customization-selectors/CraftingSelector.vue';
import AttachmentsSelector from './customization-selectors/AttachmentsSelector.vue';
import { accordionStateSaver } from '@/composables/accordion-state-save';

const { selectedWeapon, selectedWeaponMode } = storeToRefs(useWeaponsStore())

const customizationReady: Ref<boolean> = computed(() => {
    return selectedWeaponMode.value !== null
})

const customizationStateSave = accordionStateSaver(customizationReady, "customize-selector")

</script>

<template>
    <BAccordion>
        <BAccordionItem title="2. Weapon customization 🛠️" @toggle="customizationStateSave.toggleState"
            v-model="customizationStateSave.accordionState.value"
            :button-attrs="{ id: 'customization-selector-button', disabled: !customizationReady }"
            :button-class="{ 'bg-dark-subtle': !customizationReady }" id="accordion-customize-selector">
            <BContainer class="p-0">
                <InitialParametersSelector v-model="selectedWeaponMode" />
                <CraftingSelector v-model="selectedWeapon" />
                <AttachmentsSelector v-model="selectedWeapon" />
            </BContainer>
        </BAccordionItem>
    </BAccordion>
</template>

<style scoped lang="scss">
:deep(#customization-selector-button) {
    font-size: 1.2rem;
}
</style>
