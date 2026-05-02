<script setup lang="ts">
import { useWeaponsStore } from '@/stores/WeaponsStore';
import Beam from '@/models/DamageTypes/Beam';
import { computed, type Ref } from 'vue';
import Volt from '@/models/DamageTypes/Volt';
import StatInput from './StatInput.vue';


const weaponStore = useWeaponsStore()

const { beam, isSubType } = defineProps({
    beam: { type: Beam, required: true },
    isSubType: { type: Boolean }
})

const currentDps: Ref<string> = computed(() => {
    const heatDmgMod = weaponStore.selectedWeaponMode?.damageType instanceof Volt
        ? weaponStore.selectedWeaponMode?.damageType.currentHeatDmgMod
        : null

    return beam.getDpsWithMod(weaponStore.customDmgModifier, heatDmgMod).toFixed(2)
})

</script>

<template>
    <div>
        <component :is="isSubType ? 'h4' : 'h3'" class="text-base mb-2"
            :class="[isSubType ? 'italic' : 'font-semibold']">
            Beam
        </component>
        <div class="flex grow flex-wrap gap-2">
            <StatInput label="Damage per second" :value="currentDps" size="4" />
            <StatInput v-if="beam.heatPerSecond !== null" label="Heat per second" :value="beam.heatPerSecond"
                size="3" />
        </div>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
