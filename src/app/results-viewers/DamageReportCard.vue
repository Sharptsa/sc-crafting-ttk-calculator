<script setup lang="ts">
import DamageReport from '@/models/DamageReport';
import { BodyPartEnum } from '@/models/Target/BodyPart';
import type Target from '@/models/Target/Target';
import { BCard, BCardBody, BCardText, BCardSubtitle, BCollapse } from 'bootstrap-vue-next';
import type { BaseBgColorVariant } from 'bootstrap-vue-next/types/ColorTypes';
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

const cardBackground: Ref<keyof BaseBgColorVariant> = computed(() => {
    switch (props.bodyPart) {
        case BodyPartEnum.Head:
            return "danger-subtle"
        case BodyPartEnum.Body:
            return "warning-subtle"
        case BodyPartEnum.Limbs:
            return "success-subtle"
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
        breakdownList.push(`${damageReport.shots} ${plural("shot")} (${stringMinMax(damageReport.firstDmg, damageReport.lastDmg)} dmg/shot)`)
    }

    if (damageReport.alternateShots > 0) {
        breakdownList.push(`${damageReport.alternateShots} alt ${plural("shot")} (${stringMinMax(damageReport.firstAlternateDmg, damageReport.lastAlternateDmg)} dmg/shot)`)
    }

    if (damageReport.chargedShots > 0) {
        breakdownList.push( `${damageReport.chargedShots} charged ${plural("shot")} (${stringMinMax(damageReport.firstChargedDmg, damageReport.lastChargedDmg)} dmg/shot)`)
    }

    if (damageReport.beamTime > 0) {
        breakdownList.push(`${damageReport.beamTime.toFixed(3)}s of beam (${stringMinMax(damageReport.firstBeamDps, damageReport.lastBeamDps)} dps)`)
    }

    if (damageReport.electronDischargeDmg > 0) {
        breakdownList.push(`${damageReport.electronDischarges} electron ${plural('discharge')} (${damageReport.electronDischargeDmg.toFixed(2)} dmg/discharge)`)
    }

    if (damageReport.reloads > 0) {
        breakdownList.push(`${damageReport.reloads} reloads`)
    }

    if (damageReport.overheat > 0) {
        breakdownList.push(`${damageReport.overheat} overheat`)
    }

    return breakdownList
}
</script>

<template>
    <BCard no-body :bg-variant="cardBackground">
        <template #header>
            <h4 class="mb-0">
                {{ cardHeader }}
            </h4>
        </template>
        <template v-for="(damageReport, index) in props.damageReports" v-bind:key="index">
            <BCardBody>
                <BCardSubtitle class="mb-2">{{ getArmorQualityTitle(damageReport.target) }}</BCardSubtitle>
                <BCardText class="mb-0">
                    <strong>TTK: {{ damageReport.ttk.toFixed(3) }}s</strong><br>
                </BCardText>
                <BCollapse :show="props.detailedReport">
                    <em>Breakdown:</em>
                    <ul class="m-0">
                        <li v-for="(item, index) in getDamageReportBreakdown(damageReport)" v-bind:key="index">
                            <span v-html="item"></span>
                        </li>
                    </ul>
                </BCollapse>
            </BCardBody>
            <hr v-if="index !== props.damageReports.length - 1">
        </template>
    </BCard>
</template>

<style scoped lang="scss">
hr {
    margin: 0;
}
</style>
