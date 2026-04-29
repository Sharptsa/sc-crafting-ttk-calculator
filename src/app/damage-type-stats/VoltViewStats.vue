<script setup lang="ts">
import Volt from '@/models/DamageTypes/Volt';
import DamageTypeStatsFactory from './DamageTypeStatsFactory.vue';
import { BContainer, BRow, BCol, BInputGroup, BFormInput } from 'bootstrap-vue-next';

const {volt} = defineProps({
    volt: {type: Volt, required: true }
})

</script>

<template>
    <BContainer class="mb-3">
        <h4>Volt</h4>
        <BRow class="row-cols-auto g-2">
            <BCol>
                <BInputGroup prepend="Overheat cooldown" append="s">
                    <BFormInput type="text" class="i-size-5" :model-value="volt.overheatCooldown" readonly />
                </BInputGroup>
            </BCol>
            <BCol>
                <BInputGroup prepend="Heat mode threshold">
                    <BFormInput type="text" class="i-size-3" :model-value="volt.heatThreshold" readonly />
                </BInputGroup>
            </BCol>
            <BCol>
                <BInputGroup prepend="Max heat damage modifier">
                    <BFormInput type="text" class="i-size-4" :model-value="volt.maxHeatDmgMod" readonly />
                </BInputGroup>
            </BCol>
            <BCol>
                <BInputGroup prepend="Max heat generation modifier">
                    <BFormInput type="text" class="i-size-4" :model-value="volt.maxHeatGenMod" readonly />
                </BInputGroup>
            </BCol>
        </BRow>
    </BContainer>
    <template v-if="(volt.highHeatFire === null || volt.heat < volt.heatThreshold)">
        <h5 class="mt-3 mb-3">Low heat mode</h5>
        <DamageTypeStatsFactory :damage-type="volt.lowHeatFire" :is-sub-type="true" />
    </template>
    <template v-if="(volt.highHeatFire !== null)">
        <h5 class="mt-3 mb-3">High heat mode</h5>
        <DamageTypeStatsFactory :damage-type="volt.highHeatFire" :is-sub-type="true" />
    </template>
</template>

<style scoped lang="scss"></style>
