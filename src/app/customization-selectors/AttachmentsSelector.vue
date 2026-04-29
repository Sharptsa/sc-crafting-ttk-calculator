<script setup lang="ts">
import { BCol, BRow, BInputGroup, BForm, BFormSelect, BFormSelectOption, BFormInput } from 'bootstrap-vue-next';
import { ref, watch, type ModelRef, type Ref } from 'vue';
import { BarrelAttachment } from '@/models/Attachement/BarrelAttachment';
import { Weapon } from '@/models/Weapon';
import AttachmentCollection from '@/data/AttachmentCollection';
import ModHelper from '@/helpers/ModHelper';

const selectedWeapon: ModelRef<Weapon | null> = defineModel({ required: true })

const selectedBarrelAttachment: Ref<string> = ref('')
const availableBarrelAttachments: Ref<BarrelAttachment[]> = ref([])

const attachmentsCollection = new AttachmentCollection()

function getPossibleAttachments(weapon: Weapon): BarrelAttachment[] {
    if (weapon.barrelAttachmentType === null) {
        return []
    }

    return attachmentsCollection.getBySizeAndType(weapon.barrelSize, weapon.barrelAttachmentType)
}

watch(selectedWeapon, (newWeapon: Weapon | null) => {
    if (newWeapon !== null) {
        availableBarrelAttachments.value = getPossibleAttachments(newWeapon)
    }

    selectedBarrelAttachment.value = ''
})

function setBarrelAttachment(attachmentName: unknown): void {
    const barrelAttachement = availableBarrelAttachments.value.find((attachment: BarrelAttachment) => {
        return attachment.name === attachmentName as string
    })

    if (selectedWeapon.value !== null) {
        selectedWeapon.value.barrelAttachment = barrelAttachement ?? null
    }
}

const attachmentDmgPercent: Ref<number> = ref(0)
const attachmentFireRatePercent: Ref<number> = ref(0)

watch(() => selectedWeapon.value?.barrelAttachment ?? null,
    (newAttachment: BarrelAttachment | null) => {
        if (newAttachment === null) {
            attachmentDmgPercent.value = 0
            attachmentFireRatePercent.value = 0
            return
        }

        attachmentDmgPercent.value = ModHelper.toPercent(newAttachment.dmgMod)
        attachmentFireRatePercent.value = ModHelper.toPercent(newAttachment.fireRateMod)
    }
)

function attachmentModPercentString(percent: number): string {
    if (selectedBarrelAttachment.value === '') {
        return ''
    }

    return (percent > 0 ? '+' : '') + percent.toFixed(1) + '%'
}

function attachmentModPercentColor(percent: number): string {
    if (percent === 0) {
        return ''
    }
    return percent > 0 ? 'text-success' : 'text-danger'
}

</script>

<template v-if="availableBarrelAttachments.length > 0">
    <h5 class="mb-3">Attachments</h5>
    <BRow class="row-cols-auto g-2">
        <BCol sm="12" md="5" lg="6">
            <BForm>
                <BInputGroup prepend="Barrel">
                    <BFormSelect v-model="selectedBarrelAttachment" :options="availableBarrelAttachments"
                        value-field="name" text-field="name" @update:model-value="setBarrelAttachment"
                        :disabled="selectedWeapon?.barrelAttachmentType === null">
                        <template #first>
                            <BFormSelectOption value="">None</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BInputGroup>
            </BForm>
        </BCol>
        <BCol>
            <BInputGroup prepend="Damage" class="w-auto">
                <BFormInput type="text" :class="['i-size-6', attachmentModPercentColor(attachmentDmgPercent)]"
                    :value="attachmentModPercentString(attachmentDmgPercent)"
                    :disabled="selectedBarrelAttachment === ''" readonly />
            </BInputGroup>
        </BCol>
        <BCol>
            <BInputGroup prepend="Fire rate" class="w-auto">
                <BFormInput type="text" :class="['i-size-6', attachmentModPercentColor(attachmentFireRatePercent)]"
                    :value="attachmentModPercentString(attachmentFireRatePercent)"
                    :disabled="selectedBarrelAttachment === ''" readonly />
            </BInputGroup>
        </BCol>
    </BRow>
</template>

<style scoped lang="scss"></style>
