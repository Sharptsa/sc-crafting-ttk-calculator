<script setup lang="ts">
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

watch(selectedWeapon, (newWeapon, oldWeapon) => {
    if (newWeapon !== oldWeapon) {
        if (newWeapon !== null) {
            availableBarrelAttachments.value = getPossibleAttachments(newWeapon)
        }
        if (oldWeapon !== null) {
            oldWeapon.barrelAttachment = null
        }
    }

    selectedBarrelAttachment.value = ''
})

function setBarrelAttachment(): void {
    const barrelAttachement = availableBarrelAttachments.value.find((attachment: BarrelAttachment) => {
        return attachment.name === selectedBarrelAttachment.value
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
    return percent > 0 ? 'text-success' : 'text-error'
}

</script>

<template v-if="availableBarrelAttachments.length > 0">
    <div>
        <h5 class="text-base font-semibold mb-3">Attachments</h5>
        <div class="flex gap-2 flex-wrap">
            <label class="input pe-0">
                <span class="label text-base me-0 pe-0 border-0">Barrel</span>
                <select class="select sm:text-base border-e-0 rounded-s-none focus:outline-none"
                    v-model="selectedBarrelAttachment" @change="setBarrelAttachment()"
                    :disabled="selectedWeapon?.barrelAttachmentType === null">
                    <option selected value="">None</option>
                    <option v-for="(attachment, index) in availableBarrelAttachments" v-bind:key="index"
                        :value="attachment.name">{{ attachment.name }}</option>
                </select>
            </label>
            <label class="input w-fit">
                <span class="label text-base me-0 border-base-300-washed">Damage</span>
                <input type="text" :class="attachmentModPercentColor(attachmentDmgPercent)"
                    :value="attachmentModPercentString(attachmentDmgPercent)" size="5" readonly />
            </label>
            <label class="input w-fit">
                <span class="label text-base me-0 border-base-300-washed">Fire rate</span>
                <input type="text" :class="attachmentModPercentColor(attachmentFireRatePercent)"
                    :value="attachmentModPercentString(attachmentFireRatePercent)" size="5" readonly />
            </label>
        </div>
    </div>
</template>

<style scoped>
.input>input {
    text-align: center;
}
</style>
