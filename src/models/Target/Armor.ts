export class Armor {
    private static MAX_ARMOR_MOD: number = 1.15
    private static MIN_ARMOR_MOD: number = 0.85

    baseDmgMod: number
    dmgMod: number
    quality: number

    constructor(baseDmgMod: number, quality: number = 500) {
        this.baseDmgMod = baseDmgMod
        this.dmgMod = this.calculateDamageMod(baseDmgMod, quality)
        this.quality = quality
    }

    static fromType(armorType: ArmorType, quality: number) {
        switch (armorType) {
            case ArmorType.Undersuit:
                return new Armor(0.9, quality)
            case ArmorType.FlightSuit:
                return new Armor(0.85, quality)
            case ArmorType.Utility:
                return new Armor(0.75, quality)
            case ArmorType.Light:
                return new Armor(0.8, quality)
            case ArmorType.Medium:
                return new Armor(0.7, quality)
            case ArmorType.Heavy:
                return new Armor(0.6, quality)
            case ArmorType.NpcBoss:
                return new Armor(0.25)
        }
    }

    calculateDamageMod(baseDmgMod: number, quality: number) {
        const craftMod = Armor.MIN_ARMOR_MOD + (Armor.MAX_ARMOR_MOD - Armor.MIN_ARMOR_MOD) * quality / 1000
        const delta = (1 - baseDmgMod) * (craftMod - 1)
        const deltaMax = (1 - baseDmgMod) * (Armor.MAX_ARMOR_MOD - 1)

        return 1 - (1 - baseDmgMod) * (1 + (Armor.MAX_ARMOR_MOD - 1) * (delta / deltaMax))
    }
}

export enum ArmorType {
    Undersuit = "Undersuit",
    FlightSuit = "Flight Suit",
    Light = "Light",
    Medium = "Medium",
    Utility = "Utility",
    Heavy = "Heavy",
    NpcBoss = "NPC Boss"
}
