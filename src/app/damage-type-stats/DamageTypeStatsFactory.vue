<script setup lang="ts">
import Projectile from '@/models/DamageTypes/Projectile';
import Beam from '@/models/DamageTypes/Beam';
import Volt from '@/models/DamageTypes/Volt';
import ProjectileStats from './ProjectileStats.vue';
import BeamStats from './BeamStats.vue';
import VoltViewStats from './VoltViewStats.vue';
import FireSequenceStats from './FireSequenceStats.vue';
import { FireSequence } from '@/models/DamageTypes/FireSequence';
import AbstractDamageType from '@/models/DamageTypes/AbstractDamageType';
import type { PropType } from 'vue';

//const damageType = defineModel({ required: true })
const {damageType, isSubType} = defineProps({
    damageType: {type: Object as PropType<AbstractDamageType>, required: true },
    isSubType: {type: Boolean }
})

</script>


<template>
    <div>
        <ProjectileStats v-if="(damageType instanceof Projectile)" :projectile="damageType" :is-sub-type="isSubType" />
        <BeamStats v-if="(damageType instanceof Beam)" :beam="damageType" :is-sub-type="isSubType" />
        <VoltViewStats v-if="(damageType instanceof Volt)" :volt="damageType" />
        <FireSequenceStats v-if="(damageType instanceof FireSequence)" :fire-sequence="damageType" :is-sub-type="isSubType" />
    </div>
</template>
