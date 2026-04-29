import Projectile from "./Projectile"

export default class ProjectileAlternate extends Projectile {
    secondaryAlpha: number

    constructor(alpha: number, secondaryAlpha: number, fireRate: number) {
        super(alpha, fireRate)
        this.secondaryAlpha = secondaryAlpha
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    static fromJSON(jsonParams: any): ProjectileAlternate {
        return new ProjectileAlternate(
            jsonParams.alpha,
            jsonParams.secondaryAlpha,
            jsonParams.fireRate
        )
    }

    public getSecondaryAlphaWithMod(customDmgMod: number) {
        return this.secondaryAlpha * customDmgMod
    }
}
