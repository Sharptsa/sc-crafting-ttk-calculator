<script setup lang="ts">
import { BAccordion, BAccordionItem, BContainer, BCol, BRow, BInputGroup, BForm, BFormSelect, BFormSelectOption, BFormInput } from 'bootstrap-vue-next';
import { ref, type Ref } from 'vue';
import { ArmorType } from '@/models/Target/Armor';
import { useTargetsStore } from '@/stores/TargetsStore';

const targetStore = useTargetsStore()

const initialHp: Ref<number> = ref(100)
const selectedArmor: Ref<string> = ref(ArmorType.Heavy)
const armorList: Ref<string[]> = ref(Object.values(ArmorType))

function updateTargets(): void {
    const armorType = selectedArmor.value ? selectedArmor.value as ArmorType : null

    targetStore.updateAllTargets(initialHp.value, armorType)
    console.log(targetStore.targets)
}
</script>

<template>
    <BAccordion>
        <BAccordionItem title="3. Target configuration 🎯"
            :button-attrs="{ id: 'target-selector-button' }" show>
            <BContainer class="p-0">
                <BForm>
                    <BRow class="row-cols-auto g-2 mb-3">
                        <BCol>
                            <BInputGroup prepend="Initial HP">
                                <BFormInput class='i-size-5' v-model.number=initialHp type="number" min="0" max="100"
                                    step="1" @update:model-value="updateTargets" />
                            </BInputGroup>
                        </BCol>
                        <BCol>
                            <BInputGroup prepend="Armor type">
                                <BFormSelect class='i-size-17' v-model="selectedArmor" :options="armorList"
                                    @update:model-value="updateTargets">
                                    <template #first>
                                        <BFormSelectOption value="">Naked / Clothes</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BInputGroup>
                        </BCol>
                    </BRow>
                </BForm>
            </BContainer>
        </BAccordionItem>
    </BAccordion>
</template>

<style scoped lang="scss">
:deep(#target-selector-button) {
    font-size: 1.2rem;
}
</style>
