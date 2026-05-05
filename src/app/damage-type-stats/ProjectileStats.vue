<script setup lang="ts">
import Projectile from '@/models/DamageTypes/Projectile';
import ProjectileAlternate from '@/models/DamageTypes/ProjectileAlternate';
import ProjectileCharged from '@/models/DamageTypes/ProjectileCharged';
import ProjectileElectron from '@/models/DamageTypes/ProjectileElectron';
import ProjectileHeat from '@/models/DamageTypes/ProjectileHeat';
import ProjectileHeatCharged from '@/models/DamageTypes/ProjectileHeatCharged';
import Volt from '@/models/DamageTypes/Volt';
import { useWeaponsStore } from '@/stores/WeaponsStore';
import { computed } from 'vue';
import type { Ref } from 'vue';
import StatInput from './StatInput.vue';

const weaponStore = useWeaponsStore()


const { projectile, isSubType } = defineProps({
    projectile: { type: Projectile, required: true },
    isSubType: { type: Boolean }
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
    <div>
        <component :is="isSubType ? 'h4' : 'h3'" class="text-base mb-2"
            :class="[isSubType ? 'italic' : 'font-semibold']">
            {{ projectileType }}
        </component>
        <div class="flex grow flex-wrap gap-2">
            <StatInput label="Alpha" :value="currentAlpha" size="4" />
            <template v-if="(projectile instanceof ProjectileAlternate)">
                <StatInput label="Alternate alpha" :value="currentAlternateAlpha" size="4" />
            </template>
            <StatInput label="Fire rate" :value="currentFireRate" size="4" append="RPM" />
            <template v-if="(projectile.burst !== null)">
                <StatInput label="Burst Size" :value="projectile.burst.burstSize" size="1" />
                <StatInput label="Burst cooldown" :value="projectile.burst.burstCooldown" size="2" append="s" />
            </template>
            <template v-if="(projectile instanceof ProjectileCharged || projectile instanceof ProjectileHeatCharged)">
                <StatInput label="Charge time" :value="projectile.chargeTime" size="1" append="s" />
            </template>
            <template v-if="(projectile instanceof ProjectileElectron)">
                <StatInput label="Residual charge mod." :value="projectile.electronChargeMod" size="2" />
                <StatInput label="Damage per residual charge" :value="projectile.electronDmgPerCharge" size="2" />
            </template>
            <template v-if="(projectile instanceof ProjectileHeat)">
                <StatInput label="Heat per shot" :value="projectile.heatPerShot" size="3" />
                <StatInput label="Max heat fire rate mod." :value="projectile.maxHeatFireRateMod" size="2" />
            </template>
        </div>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
