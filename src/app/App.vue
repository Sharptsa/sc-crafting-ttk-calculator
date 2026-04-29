<script setup lang="ts">
import { BApp, BContainer, BRow, BCol } from 'bootstrap-vue-next'
import WeaponSelector from './WeaponSelector.vue';
import NavHeader from './NavBar.vue';
import WeaponStatsViewer from './WeaponStatsViewer.vue';
import CustomizationSelector from './CustomizationSelector.vue';
import ResultsViewer from './ResultsViewer.vue';
import TargetSelector from './TargetSelector.vue';

</script>

<template>
    <BApp no-orchestrator>
        <NavHeader class="mb-3" />
        <BContainer fluid="xl" class="mb-3">
            <BRow>
                <BCol cols="12" lg="5" class="mb-4 p-0">
                    <BContainer fluid="xl">
                        <BRow class="mb-3">
                            <WeaponSelector />
                        </BRow>
                        <BRow class="mb-3">
                            <CustomizationSelector />
                        </BRow>
                        <BRow class="">
                            <TargetSelector />
                        </BRow>
                    </BContainer>
                </BCol>
                <BCol cols="12" lg="7">
                    <BRow class="mb-3">
                        <WeaponStatsViewer />
                    </BRow>
                    <BRow>
                        <ResultsViewer />
                    </BRow>
                </BCol>
            </BRow>
        </BContainer>
    </BApp>
</template>
