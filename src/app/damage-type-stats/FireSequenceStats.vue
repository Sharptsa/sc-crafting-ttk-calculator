<script setup lang="ts">
import { FireSequence, } from '@/models/DamageTypes/FireSequence';
import DamageTypeStatsFactory from './DamageTypeStatsFactory.vue';
import { BRow } from 'bootstrap-vue-next';

const {fireSequence, isSubType} = defineProps({
    fireSequence: {type: FireSequence, required: true },
    isSubType: {type: Boolean }
})

</script>


<template>
    <BRow v-for="(fireEvent, index) in fireSequence.fireEvents" :key="index">
        <DamageTypeStatsFactory class="mb-3" :damage-type="fireEvent.damageType" :is-sub-type="isSubType" />
    </BRow>
</template>
