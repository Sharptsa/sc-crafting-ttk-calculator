export default class Crafting {
    maxDmgMod: number | null
    maxFireRateMod: number | null
    dmgMod: number = 1
    fireRateMod: number = 1

    constructor(maxDmgMod: number | null, maxFireRateMod: number | null) {
        this.maxDmgMod = maxDmgMod
        this.maxFireRateMod = maxFireRateMod
    }

    get maxDmgPercent(): number | null {
        if (this.maxDmgMod === null) {
            return null
        }
        return (this.maxDmgMod - 1) * 100
    }

    get maxFireRatePercent(): number | null {
        if (this.maxFireRateMod === null) {
            return null
        }
        return (this.maxFireRateMod - 1) * 100
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    static fromJSON(jsonCrafting: any): Crafting {
        return new Crafting(
            jsonCrafting.maxDmgMod,
            jsonCrafting.maxFireRateMod
        )
    }
}
