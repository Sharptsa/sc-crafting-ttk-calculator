import Projectile from "./Projectile"

export default class ProjectileElectron extends Projectile {
    electronChargeMod: number
    electronDmgPerCharge: number

    constructor(alpha: number, fireRate: number, electronChargeMod: number, electronDmgPerCharge: number) {
        super(alpha, fireRate)
        this.electronChargeMod = electronChargeMod
        this.electronDmgPerCharge = electronDmgPerCharge
    }
}
