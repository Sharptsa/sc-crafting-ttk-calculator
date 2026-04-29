import type { Armor } from "./Armor"
import { BodyPart } from "./BodyPart"

export default class Target {
    static MAX_HP: number = 100
    initialHp: number
    currentHp: number
    bodyPart: BodyPart
    armor: Armor | null
    electronCharges: number = 0

    constructor(bodyPart: BodyPart, armor: Armor | null, initialHp: number | null = null) {
        this.initialHp = initialHp ?? Target.MAX_HP
        this.currentHp = this.initialHp
        this.bodyPart = bodyPart
        this.armor = armor
    }

    damage(dmg: number): number {
        const totalDamage = dmg * this.dmgMod()
        this.currentHp -= totalDamage

        return totalDamage
    }

    dmgMod(): number {
        return this.armor !== null
            ? this.bodyPart.dmgMod * (this.armor.dmgMod ?? 1)
            : this.bodyPart.nakedDmgMod
    }

    resetHp(): void {
        this.currentHp = this.initialHp
    }
}
