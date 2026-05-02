<script setup lang="ts">
import Calculator from '@/models/Calculator';
import DamageReport from '@/models/DamageReport';
import { useTargetsStore } from '@/stores/TargetsStore';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { computed, type Ref } from 'vue';
import { cloneDeep } from 'lodash';
import Target from '@/models/Target/Target';
import type { Weapon } from '@/models/Weapon';
import type FireMode from '@/models/FireMode';
import { BodyPartEnum } from '@/models/Target/BodyPart';
import DamageReportCard from './results-viewers/DamageReportCard.vue';
import { useStorage } from '@vueuse/core';

const weaponsStore = useWeaponsStore()
const targetsStore = useTargetsStore()

const detailedReport: Ref<boolean> = useStorage('pref:detailed-report', true)

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
    <div class="bg-base-100 border-base-300 collapse border grow">
        <input type="checkbox" class="peer hidden" :checked="resultsReady" disabled />
        <h2
            class="collapse-title text-lg border-base-300 py-3 pe-4 cursor-default bg-neutral text-base-content peer-checked:bg-primary peer-checked:text-primary-content peer-checked:border-b flex w-full">
            <span class="grow">Results 🔍</span>
            <label class="label text-sm text-base-content shrink">
                Detailed report
                <input type="checkbox" v-model="detailedReport" class="toggle toggle-sm" />
            </label>
        </h2>

        <div class="collapse-content peer-checked:p-4 grid grid-cols-12 gap-3">
            <DamageReportCard v-for="(damageReports, bodyPart) in results" v-bind:key="bodyPart" :body-part="bodyPart"
                :damage-reports="damageReports" :detailed-report="detailedReport" />
        </div>
    </div>
</template>

<style scoped></style>
