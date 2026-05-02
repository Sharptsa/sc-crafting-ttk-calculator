<script setup lang="ts">
import WeaponSelector from './WeaponSelector.vue';
import WeaponStatsViewer from './WeaponStatsViewer.vue';
import CustomizationSelector from './CustomizationSelector.vue';
import ResultsViewer from './ResultsViewer.vue';
import TargetSelector from './TargetSelector.vue';
import NavBar from './NavBar.vue';

</script>

<template>
    <div id="app">
        <NavBar />
        <div class="mt-5 mx-auto max-w-480 px-1 md:px-4">
            <div class="grid grid-cols-12 gap-4 w-full">
                <div class="col-span-12 xl:col-span-5">
                    <div class="flex mb-3">
                        <WeaponSelector />
                    </div>
                    <div class="flex mb-3">
                         <CustomizationSelector />
                    </div>
                    <div class="flex">
                        <TargetSelector />
                    </div>
                </div>
                <div class="col-span-12 xl:col-span-7">
                    <div class="flex mb-3">
                        <WeaponStatsViewer />
                    </div>
                    <div class="flex">
                        <ResultsViewer />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
