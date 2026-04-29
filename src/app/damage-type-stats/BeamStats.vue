<script setup lang="ts">
import { useWeaponsStore } from '@/stores/WeaponsStore';
import Beam from '@/models/DamageTypes/Beam';
import { computed, type Ref } from 'vue';
import Volt from '@/models/DamageTypes/Volt';
import { BContainer, BRow, BCol, BInputGroup, BFormInput } from 'bootstrap-vue-next';

const weaponStore = useWeaponsStore()

const {beam, isSubType} = defineProps({
    beam: {type: Beam, required: true },
    isSubType: {type: Boolean }
})

const currentDps: Ref<string> = computed(() => {
    const heatDmgMod = weaponStore.selectedWeaponMode?.damageType instanceof Volt
        ? weaponStore.selectedWeaponMode?.damageType.currentHeatDmgMod
        : null

    return beam.getDpsWithMod(weaponStore.customDmgModifier, heatDmgMod).toFixed(2)
})

</script>

<template>
    <BContainer class="mb-3 g-2">
        <component :is="isSubType ? 'h6' : 'h5'">Beam</component>
        <BRow class="row-cols-auto g-2">
            <BCol>
                <BInputGroup prepend="Damage per second">
                    <BFormInput type="text" class="i-size-5" :model-value="currentDps" readonly />
                </BInputGroup>
            </BCol>
            <BCol>
                <BInputGroup prepend="Heat per second">
                    <BFormInput type="text" class="i-size-4" :model-value="beam.heatPerSecond" readonly />
                </BInputGroup>
            </BCol>
        </BRow>
    </BContainer>
</template>

<style scoped lang="scss"></style>
