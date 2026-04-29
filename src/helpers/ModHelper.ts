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
}
