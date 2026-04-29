import ProjectileHeat from "./ProjectileHeat"

export default class ProjectileHeatCharged extends ProjectileHeat {
    chargeTime: number

    constructor(
        alpha: number, 
        fireRate: number, 
        heatPerShot: number, 
        heatFireRateMod: number, 
        chargeTime: number
    ) {
        super(alpha, fireRate, heatPerShot, heatFireRateMod)
        this.chargeTime = chargeTime
    }
}
