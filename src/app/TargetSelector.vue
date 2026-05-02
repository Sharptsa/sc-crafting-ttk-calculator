<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { ArmorType } from '@/models/Target/Armor';
import { useTargetsStore } from '@/stores/TargetsStore';
import { collapseStateSaver } from '@/composables/collapse-state-save';

const targetStore = useTargetsStore()

const initialHp: Ref<number> = ref(100)
const selectedArmor: Ref<string> = ref(ArmorType.Heavy)
const armorList: Ref<string[]> = ref(Object.values(ArmorType))

const stateSaver = collapseStateSaver("target-selector")

function updateTargets(): void {
    const armorType = selectedArmor.value ? selectedArmor.value as ArmorType : null

    targetStore.updateAllTargets(initialHp.value, armorType)
}
</script>

<template>
    <div class="collapse collapse-arrow bg-base-100 border-base-300 border grow"
        :class="{ 'collapse-open': stateSaver.collapseState.value }">
        <input type="checkbox" :checked="stateSaver.collapseState.value" @change="stateSaver.toggleState" class="peer" />
        <h2
            class="collapse-title bg-base-100 peer-checked:bg-primary text-base-content peer-checked:text-primary-content border-base-300 peer-checked:border-b text-lg py-3 ">
            3. Configure target 🎯
        </h2>
        <div class="collapse-content peer-checked:p-4 peer-checked:border-0">
            <div class="flex gap-3 flex-wrap">
                <label class="input w-fit">
                    <span class="label text-base me-0 border-base-300-washed">Initial HP</span>
                    <input type="number" min="0" max="100" step="1" v-model="initialHp" @input="updateTargets()"
                        size="3" />
                </label>
                <label class="input pe-0">
                    <span class="label text-base pe-0 me-0 border-0">Armor type</span>
                    <select class="select sm:text-base border-e-0 rounded-s-none focus:outline-none"
                        v-model="selectedArmor" @change="updateTargets()">
                        <option selected value="">Naked / Clothes</option>
                        <option v-for="(armorType, index) in armorList" v-bind:key="index" :value="armorType">{{
                            armorType
                        }}</option>
                    </select>
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
