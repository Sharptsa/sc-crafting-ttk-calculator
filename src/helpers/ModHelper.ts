export default class ModHelper {
    static toPercent(mod: number|null|undefined) {
        mod = mod ?? 1
        return (mod - 1) * 100
    }

    static toMod(percent: number|null|undefined) {
        percent = percent ?? 0
        return 1 + (percent / 100)
    }

    static calculateHeatMod(heat: number, maxHeatMod: number): number {
        if (maxHeatMod === 1) {
            return 1
        }
        return this.toMod(heat * this.toPercent(maxHeatMod) / 100)
    }

    static toModFromQuality(minMod: number, maxMod: number, baseMod: number, quality: number): number {
        const craftMod = minMod + (maxMod - minMod) * quality / 1000

        if (baseMod === 1) {
            return craftMod
        }

        const delta = (1 - baseMod) * (craftMod - 1)
        const deltaMax = (1 - baseMod) * (maxMod - 1)

        return 1 - (1 - baseMod) * (1 + (maxMod - 1) * (delta / deltaMax))
    }
}
