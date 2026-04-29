<script setup lang="ts">
import Calculator from '@/models/Calculator';
import DamageReport from '@/models/DamageReport';
import { useTargetsStore } from '@/stores/TargetsStore';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { computed, type Ref } from 'vue';
import { cloneDeep } from 'lodash';
import { BCol, BContainer, BRow, BAccordion, BAccordionItem, BForm, BFormCheckbox } from 'bootstrap-vue-next';
import Target from '@/models/Target/Target';
import type { Weapon } from '@/models/Weapon';
import type FireMode from '@/models/FireMode';
import { BodyPartEnum } from '@/models/Target/BodyPart';
import DamageReportCard from './results-viewers/DamageReportCard.vue';
import { useStorage, useWindowSize } from '@vueuse/core';

const { width } = useWindowSize()

const weaponsStore = useWeaponsStore()
const targetsStore = useTargetsStore()

const detailedReport: Ref<boolean> = useStorage('pref:detailed-report', false)

const results = computed((): { [key in BodyPartEnum]: DamageReport[] } => {
    const damageReportsCollection: { [key in BodyPartEnum]: DamageReport[] } = {
        [BodyPartEnum.Head]: [],
        [BodyPartEnum.Body]: [],
        [BodyPartEnum.Limbs]: []
    }

    if (weaponsStore.selectedWeapon === null || weaponsStore.selectedWeaponMode === null) {
        return damageReportsCollection
    }

    const calculator = new Calculator()

    targetsStore.targets.forEach((target: Target) => {
        const damageReport = calculator.calculateTTK(cloneDeep(target), cloneDeep(weaponsStore.selectedWeapon as Weapon), cloneDeep(weaponsStore.selectedWeaponMode as FireMode))

        damageReportsCollection[target.bodyPart.name].push(damageReport)
    })

    return damageReportsCollection
})

const resultsReady: Ref<boolean> = computed(() => {
    return weaponsStore.selectedWeaponMode !== null
})

</script>

<template>
    <BAccordion>
        <BAccordionItem title="Results 🔍" :button-attrs="{ id: 'results-button', disabled: true }"
            :button-class="[!resultsReady ? 'bg-dark-subtle' : '', 'accordion-no-arrow']" v-model="resultsReady" body-class="pt-1">
            <BContainer class="p-0">
                <div class="d-flex justify-content-end">
                    <BForm><BFormCheckbox switch class="mb-1" v-model="detailedReport">Detailed report</BFormCheckbox></BForm>
                </div>
                <BRow class="g-3">
                    <BCol v-for="(damageReports, bodyPart) in results" v-bind:key="bodyPart" cols="12" md="4"
                        :class="{ 'mb-2': width <= 840 }">
                        <DamageReportCard :body-part="bodyPart" :damage-reports="damageReports" :detailed-report="detailedReport" />
                    </BCol>
                </BRow>
            </BContainer>
        </BAccordionItem>
    </BAccordion>
</template>

<style scoped lang="scss">
:deep(#results-button) {
    font-size: 1.2rem
}
</style>
