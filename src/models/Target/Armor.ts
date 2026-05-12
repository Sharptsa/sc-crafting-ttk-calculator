import ModHelper from "@/helpers/ModHelper"

export class Armor {
    private static MAX_ARMOR_MOD: number = 1.15
    private static MIN_ARMOR_MOD: number = 0.85

    baseDmgMod: number
    dmgMod: number
    quality: number

    constructor(baseDmgMod: number, quality: number = 500) {
        this.baseDmgMod = baseDmgMod
        this.dmgMod = ModHelper.toModFromQuality(Armor.MIN_ARMOR_MOD, Armor.MAX_ARMOR_MOD, baseDmgMod, quality)
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
}

export enum ArmorType {
    Undersuit = "Undersuit",
    FlightSuit = "Combat Flight Suit",
    Light = "Light",
    Medium = "Medium",
    Utility = "Utility",
    Heavy = "Heavy",
    NpcBoss = "NPC Boss"
}
