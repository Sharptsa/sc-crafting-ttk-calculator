<script setup lang="ts">
import Projectile from '@/models/DamageTypes/Projectile';
import ProjectileAlternate from '@/models/DamageTypes/ProjectileAlternate';
import ProjectileCharged from '@/models/DamageTypes/ProjectileCharged';
import ProjectileElectron from '@/models/DamageTypes/ProjectileElectron';
import ProjectileHeat from '@/models/DamageTypes/ProjectileHeat';
import ProjectileHeatCharged from '@/models/DamageTypes/ProjectileHeatCharged';
import Volt from '@/models/DamageTypes/Volt';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { BContainer, BRow, BCol, BInputGroup, BFormInput } from 'bootstrap-vue-next';
import { computed } from 'vue';
import type { Ref } from 'vue';

const weaponStore = useWeaponsStore()


const {projectile, isSubType} = defineProps({
    projectile: {type: Projectile, required: true },
    isSubType: {type: Boolean }
})

const projectileType: Ref<string> = computed(() => {
    if (projectile instanceof ProjectileAlternate) {
        return 'Alternating projectile'
    }
    else if (projectile instanceof ProjectileCharged || projectile instanceof ProjectileHeatCharged) {
        return 'Charged projectile'
    }
    else if (projectile instanceof ProjectileElectron) {
        return 'Electron projectile'
    }
    else return 'Projectile'
})

const currentAlpha: Ref<string> = computed(() => {
    const customDmgMod = weaponStore.selectedWeapon?.customDmgMod ?? 1

    if (projectile instanceof ProjectileHeat && weaponStore.selectedWeaponMode?.damageType instanceof Volt) {
        return projectile.getAlphaWithMod(customDmgMod, weaponStore.selectedWeaponMode.damageType.currentHeatDmgMod).toFixed(2)
    }

    return projectile.getAlphaWithMod(customDmgMod).toFixed(2)
})

const currentAlternateAlpha: Ref<string> = computed(() => {
    if (!(projectile instanceof ProjectileAlternate)) {
        return ''
    }

    return projectile.getSecondaryAlphaWithMod(weaponStore.customDmgModifier).toFixed(2)
})

const currentFireRate: Ref<string> = computed(() => {
    const customFireRateMod = weaponStore.customFireRateModifier

    if (projectile instanceof ProjectileHeat && weaponStore.selectedWeaponMode?.damageType instanceof Volt) {
        return projectile.getFireRateWithMod(customFireRateMod, weaponStore.selectedWeaponMode.damageType.heat).toFixed(2)
    }

    return projectile.getFireRateWithMod(customFireRateMod).toFixed(2)
})


</script>

<template>
    <BContainer>
        <component :is="isSubType ? 'h6' : 'h5'">{{ projectileType }}</component>
        <BRow class="row-cols-auto g-2">
            <BCol>
                <BInputGroup prepend="Alpha">
                    <BFormInput type="text" class="i-size-6" :model-value="currentAlpha" readonly />
                </BInputGroup>
            </BCol>
            <template v-if="(projectile instanceof ProjectileAlternate)">
                <BCol>
                    <BInputGroup prepend="Alternate alpha">
                        <BFormInput type="text" class="i-size-6" :model-value="currentAlternateAlpha" readonly />
                    </BInputGroup>
                </BCol>
            </template>
            <BCol>
                <BInputGroup prepend="Fire rate" append="RPM">
                    <BFormInput type="text" class="i-size-6" :model-value="currentFireRate" readonly />
                </BInputGroup>
            </BCol>
            <template v-if="(projectile.burst !== null)">
                <BCol>
                    <BInputGroup prepend="Burst Size">
                        <BFormInput type="text" class="i-size-2" :model-value="projectile.burst.burstSize" readonly />
                    </BInputGroup>
                </BCol>
                <BCol>
                    <BInputGroup prepend="Burst cooldown" append="s">
                        <BFormInput type="text" class="i-size-4" :model-value="projectile.burst.burstCooldown" readonly />
                    </BInputGroup>
                </BCol>
            </template>
            <template v-if="(projectile instanceof ProjectileCharged)">
                <BCol>
                    <BInputGroup prepend="Charge time" append="s">
                        <BFormInput type="text" class="i-size-3" :model-value="projectile.chargeTime" readonly />
                    </BInputGroup>
                </BCol>
            </template>
            <template v-if="(projectile instanceof ProjectileElectron)">
                <BCol>
                    <BInputGroup prepend="Residual charge modifier">
                        <BFormInput type="text" class="i-size-3" :model-value="projectile.electronChargeMod" readonly />
                    </BInputGroup>
                </BCol>
                <BCol>
                    <BInputGroup prepend="Damage per residual charge">
                        <BFormInput type="text" class="i-size-3" :model-value="projectile.electronDmgPerCharge" readonly />
                    </BInputGroup>
                </BCol>
            </template>
            <template v-if="(projectile instanceof ProjectileHeat)">
                <BCol>
                    <BInputGroup prepend="Heat per shot">
                        <BFormInput type="text" class="i-size-7" :model-value="projectile.heatPerShot" readonly />
                    </BInputGroup>
                </BCol>
                <BCol>
                    <BInputGroup prepend="Max heat fire rate modifier">
                        <BFormInput type="text" class="i-size-3" :model-value="projectile.maxHeatFireRateMod" readonly />
                    </BInputGroup>
                </BCol>
                <BCol v-if="(projectile instanceof ProjectileHeatCharged)">
                    <BInputGroup prepend="Charge time" append="s">
                        <BFormInput type="text" class="i-size-3" :model-value="projectile.chargeTime" readonly />
                    </BInputGroup>
                </BCol>
            </template>
        </BRow>
    </BContainer>
</template>

<style scoped lang="scss"></style>
