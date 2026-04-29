import type Burst from "./Burst"
import Projectile from "./Projectile"

export default class ProjectileCharged extends Projectile {
    chargeTime: number

    constructor(alpha: number, fireRate: number, chargeTime: number, burst: Burst | null = null) {
        super(alpha, fireRate, burst)
        this.chargeTime = chargeTime
    }
}
