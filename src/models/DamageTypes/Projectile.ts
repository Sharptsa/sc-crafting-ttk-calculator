import AbstractDamageType from "./AbstractDamageType"
import type Burst from "./Burst"

export default class Projectile extends AbstractDamageType {
    alpha: number
    fireRate: number
    burst: Burst | null = null

    constructor(alpha: number, fireRate: number, burst: Burst | null = null) {
        super()
        this.alpha = alpha
        this.fireRate = fireRate
        this.burst = burst
    }

    public getAlphaWithMod(customDmgMod: number) {
        return this.alpha * customDmgMod
    }

    public getFireRateWithMod(customFireRateMod: number) {
        return this.fireRate * customFireRateMod
    }
}
