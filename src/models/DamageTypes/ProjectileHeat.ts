import Projectile from "./Projectile"
import ModHelper from "@/helpers/ModHelper"

export default class ProjectileHeat extends Projectile {
    heatPerShot: number
    maxHeatFireRateMod: number

    constructor(alpha: number, fireRate: number, heatPerShot: number, heatFireRateMod: number) {
        super(alpha, fireRate)
        this.heatPerShot = heatPerShot
        this.maxHeatFireRateMod = heatFireRateMod
    }

    public getAlphaWithMod(customDmgMod: number, heatDmgMod?: number) {
        return this.alpha * customDmgMod * (heatDmgMod ?? 1)
    }

    public getFireRateWithMod(customFireRateMod: number, heat?: number): number {
        return super.getFireRateWithMod(customFireRateMod) * ModHelper.calculateHeatMod(heat ?? 0, this.maxHeatFireRateMod)
    }
}
