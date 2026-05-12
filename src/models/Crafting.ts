import ModHelper from "@/helpers/ModHelper"

export default class Crafting {
    public static LEVEL_QUALITY_MAP: Record<number, number> = {
        0: 500,
        1: 521,
        2: 664,
        3: 710,
        4: 874,
        5: 907,
        6: 970,
        7: 1000
    }

    maxDmgMod: number | null
    maxFireRateMod: number | null
    dmgMod: number = 1
    fireRateMod: number = 1
    linked: boolean

    constructor(maxDmgMod: number | null, maxFireRateMod: number | null, linked: boolean = false) {
        this.maxDmgMod = maxDmgMod
        this.maxFireRateMod = maxFireRateMod
        this.linked = linked
    }

    getDmgModFromLevel(level: number): number {
        if (this.maxDmgMod === null) {
            return 1
        }

        const quality = Crafting.LEVEL_QUALITY_MAP[level]

        if (quality === undefined) {
            throw new Error('Unexpected quality level')
        }

        return ModHelper.toModFromQuality(1 - (this.maxDmgMod - 1), this.maxDmgMod, 1, quality)
    }

    getFireRateModFromLevel(level: number): number {
        if (this.maxFireRateMod === null) {
            return 1
        }

        const quality = Crafting.LEVEL_QUALITY_MAP[level]

        if (quality === undefined) {
            throw new Error('Unexpected quality level')
        }

        return ModHelper.toModFromQuality(1 - (this.maxFireRateMod - 1), this.maxFireRateMod, 1, quality)
    }
}
