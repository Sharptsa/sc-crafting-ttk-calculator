import Projectile from "./Projectile"

export default class ProjectileAlternate extends Projectile {
    secondaryAlpha: number

    constructor(alpha: number, secondaryAlpha: number, fireRate: number) {
        super(alpha, fireRate)
        this.secondaryAlpha = secondaryAlpha
    }

    public getSecondaryAlphaWithMod(customDmgMod: number) {
        return this.secondaryAlpha * customDmgMod
    }
}
