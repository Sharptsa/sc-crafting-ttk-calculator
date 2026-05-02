<script setup lang="ts">
import Volt from '@/models/DamageTypes/Volt';
import DamageTypeStatsFactory from './DamageTypeStatsFactory.vue';
import StatInput from './StatInput.vue';

const { volt } = defineProps({
    volt: { type: Volt, required: true }
})

</script>

<template>
    <div>
        <h4 class="text-base font-semibold mb-2">Volt</h4>
        <div class="flex grow flex-wrap gap-2">
            <StatInput label="Overheat cooldown" :value="volt.overheatCooldown" size="2" apprend="s" />
            <StatInput label="Heat mode threshold" :value="volt.heatThreshold" size="2" />
            <StatInput label="Max heat damage mod." :value="volt.maxHeatDmgMod" size="2" />
            <StatInput label="Max heat generation mod." :value="volt.maxHeatGenMod" size="2" />
        </div>
        <template v-if="(volt.highHeatFire === null || volt.heat < volt.heatThreshold)">
            <h4 class="text-base underline mt-4 mb-2">Low heat mode</h4>
            <div class="ms-4">
                <DamageTypeStatsFactory :damage-type="volt.lowHeatFire" :is-sub-type="true" />
            </div>
        </template>
        <template v-if="(volt.highHeatFire !== null)">
            <h4 class="text-base underline mt-4 mb-2">High heat mode</h4>
            <div class="ms-4">
                <DamageTypeStatsFactory :damage-type="volt.highHeatFire" :is-sub-type="true" />
            </div>
        </template>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
