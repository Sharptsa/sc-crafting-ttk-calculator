<script setup lang="ts">
import DamageReport from '@/models/DamageReport';
import { BodyPartEnum } from '@/models/Target/BodyPart';
import type Target from '@/models/Target/Target';
import { plural } from 'pluralize';
import { computed, type Ref } from 'vue';

const props = defineProps({
    bodyPart: { type: String, required: true },
    damageReports: { type: Array<DamageReport>, required: true },
    detailedReport: { type: Boolean, required: true }
})

const cardHeader: Ref<string> = computed(() => {
    switch (props.bodyPart) {
        case BodyPartEnum.Head:
            return "Head 😐"
        case BodyPartEnum.Body:
            return "Body 👕"
        case BodyPartEnum.Limbs:
            return "Limbs 🦵"
        default:
            throw Error("Unexpected body part: " + props.bodyPart)
    }
})

const cardColor: Ref<string> = computed(() => {
    switch (props.bodyPart) {
        case BodyPartEnum.Head:
            return "bg-error-washed"
        case BodyPartEnum.Body:
            return "bg-warning-washed"
        case BodyPartEnum.Limbs:
            return "bg-success-washed"
        default:
            throw Error("Unexpected body part: " + props.bodyPart)
    }
})

function getArmorQualityTitle(target: Target) {
    if (target.armor === null) {
        return "No armor"
    }

    switch (target.armor.quality) {
        case 500:
            return "Base armor"
        case 1000:
            return "Max quality armor"
    }
}

function getDamageReportBreakdown(damageReport: DamageReport): string[] {
    const breakdownList: string[] = []

    const stringMinMax = (firstValue: number | null, lastValue: number | null): string => {
        if (firstValue === null) {
            return ''
        }

        let str = firstValue.toFixed(2)

        if (lastValue !== null && firstValue !== lastValue) {
            str += ` - ${lastValue.toFixed(2)}`
        }

        return str
    }

    if (damageReport.shots > 0) {
        breakdownList.push(`${damageReport.shots} ${pluralize("shot", damageReport.shots)} (${stringMinMax(damageReport.firstDmg, damageReport.lastDmg)} dmg/shot)`)
    }

    if (damageReport.alternateShots > 0) {
        breakdownList.push(`${damageReport.alternateShots} alt ${pluralize("shot", damageReport.alternateShots)} (${stringMinMax(damageReport.firstAlternateDmg, damageReport.lastAlternateDmg)} dmg/shot)`)
    }

    if (damageReport.chargedShots > 0) {
        breakdownList.push(`${damageReport.chargedShots} charged ${pluralize("shot", damageReport.chargedShots)} (${stringMinMax(damageReport.firstChargedDmg, damageReport.lastChargedDmg)} dmg/shot)`)
    }

    if (damageReport.beamTime > 0) {
        breakdownList.push(`${damageReport.beamTime.toFixed(3)}s of beam (${stringMinMax(damageReport.firstBeamDps, damageReport.lastBeamDps)} dps)`)
    }

    if (damageReport.electronDischargeDmg > 0) {
        breakdownList.push(`${damageReport.electronDischarges} ${pluralize('discharge', damageReport.electronDischarges)} (${damageReport.electronDischargeDmg.toFixed(2)} dmg/discharge)`)
    }

    if (damageReport.reloads > 0) {
        breakdownList.push(`${damageReport.reloads} reloads`)
    }

    if (damageReport.overheat > 0) {
        breakdownList.push(`${damageReport.overheat} overheat`)
    }

    return breakdownList
}

function pluralize(str: string, nb: number): string {
    return nb > 1 ? plural(str) : str
}
</script>

<template>
    <div class="card col-span-12 sm:col-span-4 border border-base-300-strong" :class="cardColor">
        <div class="card-body p-0">
            <h3 class="border-b border-base-300-strong text-lg sm:text-xl p-2 font-semibold text-center">{{ cardHeader }}</h3>
            <template v-for="(damageReport, index) in damageReports" v-bind:key="index">
                <div class="px-3 pb-3">
                    <h4 class="text-base text-base-content-washed mb-2">{{
                        getArmorQualityTitle(damageReport.target) }}
                    </h4>
                    <div>
                        <span class="text-base sm:text-lg font-bold">TTK: {{ damageReport.ttk.toFixed(3) }}s</span><br>
                        <div class="collapse">
                            <input type="checkbox" class="hidden" :checked="detailedReport" disabled />
                            <div class="collapse-content p-0 text-base mt-2">
                                <em>Breakdown:</em>
                                <ul class="list-disc">
                                    <li v-for="(item, index) in getDamageReportBreakdown(damageReport)"
                                        v-bind:key="index" class="ms-4">
                                        <span v-html="item"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="text-base-300-strong" v-if="index !== damageReports.length - 1">
            </template>
        </div>
    </div>
</template>

<style scoped></style>
