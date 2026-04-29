import ModHelper from "@/helpers/ModHelper"
import AbstractDamageType from "./AbstractDamageType"

export default class Volt extends AbstractDamageType {
    lowHeatFire: AbstractDamageType
    highHeatFire: AbstractDamageType | null
    heat: number = 0
    overheatCooldown: number
    heatThreshold: number
    maxHeatDmgMod: number
    maxHeatGenMod: number

    constructor(
        lowHeatFire: AbstractDamageType,
        highHeatFire: AbstractDamageType | null,
        overheatCooldown: number,
        heatThreshold: number,
        maxHeatDmgMod: number,
        maxHeatGenMod: number,
    ) {
        super()
        this.lowHeatFire = lowHeatFire
        this.highHeatFire = highHeatFire
        this.overheatCooldown = overheatCooldown
        this.heatThreshold = heatThreshold
        this.maxHeatDmgMod = maxHeatDmgMod
        this.maxHeatGenMod = maxHeatGenMod
    }

    get currentHeatDmgMod(): number
    {
        return ModHelper.calculateHeatMod(this.heat, this.maxHeatDmgMod)
    }

    get currentHeatGenMod(): number
    {
        return ModHelper.calculateHeatMod(this.heat, this.maxHeatGenMod)
    }
}
