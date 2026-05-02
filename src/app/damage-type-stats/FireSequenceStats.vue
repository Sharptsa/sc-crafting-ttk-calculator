<script setup lang="ts">
import { FireSequence, } from '@/models/DamageTypes/FireSequence';
import DamageTypeStatsFactory from './DamageTypeStatsFactory.vue';

const {fireSequence, isSubType} = defineProps({
    fireSequence: {type: FireSequence, required: true },
    isSubType: {type: Boolean }
})

</script>


<template>
    <div class="mb-3" v-for="(fireEvent, index) in fireSequence.fireEvents" :key="index">
        <DamageTypeStatsFactory :damage-type="fireEvent.damageType" :is-sub-type="isSubType" />
    </div>
</template>
