import { Armor, ArmorType } from '@/models/Target/Armor'
import { BodyPart } from '@/models/Target/BodyPart'
import Target from '@/models/Target/Target'
import { defineStore } from 'pinia'

export const useTargetsStore = defineStore('targets', {
    state: () => {
        return {
            targets: [
                new Target(BodyPart.head(), Armor.fromType(ArmorType.Heavy, 500)),
                new Target(BodyPart.head(), Armor.fromType(ArmorType.Heavy, 1000)),
                new Target(BodyPart.body(), Armor.fromType(ArmorType.Heavy, 500)),
                new Target(BodyPart.body(), Armor.fromType(ArmorType.Heavy, 1000)),
                new Target(BodyPart.limbs(), Armor.fromType(ArmorType.Heavy, 500)),
                new Target(BodyPart.limbs(), Armor.fromType(ArmorType.Heavy, 1000))
            ]
        }
    },
    actions: {
        updateAllTargets(hp: number, armorType: ArmorType | null) {
            if (armorType === null) {
                this.targets = [
                    new Target(BodyPart.head(), null),
                    new Target(BodyPart.body(), null),
                    new Target(BodyPart.limbs(), null),
                ]
                return
            }

            this.targets = [
                new Target(BodyPart.head(), Armor.fromType(armorType, 500)),
                new Target(BodyPart.head(), Armor.fromType(armorType, 1000)),
                new Target(BodyPart.body(), Armor.fromType(armorType, 500)),
                new Target(BodyPart.body(), Armor.fromType(armorType, 1000)),
                new Target(BodyPart.limbs(), Armor.fromType(armorType, 500)),
                new Target(BodyPart.limbs(), Armor.fromType(armorType, 1000))
            ]
        }
    }
})
