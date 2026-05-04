import ModHelper from "@/helpers/ModHelper"
import AbstractDamageType from "./AbstractDamageType"
import ProjectileHeat from "./ProjectileHeat"
import Beam from "./Beam"

type CurvePoint = {
    x: number,
    y: number
}

export default class Volt extends AbstractDamageType {
    lowHeatFire: AbstractDamageType
    highHeatFire: AbstractDamageType | null
    heat: number = 0
    overheatCooldown: number
    heatThreshold: number
    maxHeatDmgMod: number
    maxHeatGenMod: number
    heatCurve: [CurvePoint, CurvePoint]
    airTemp: number = 20

    constructor(
        lowHeatFire: AbstractDamageType,
        highHeatFire: AbstractDamageType | null,
        overheatCooldown: number,
        heatThreshold: number,
        maxHeatDmgMod: number,
        maxHeatGenMod: number,
        heatCurve: [CurvePoint, CurvePoint]
    ) {
        super()
        this.lowHeatFire = lowHeatFire
        this.highHeatFire = highHeatFire
        this.overheatCooldown = overheatCooldown
        this.heatThreshold = heatThreshold
        this.maxHeatDmgMod = maxHeatDmgMod
        this.maxHeatGenMod = maxHeatGenMod
        this.heatCurve = heatCurve

        this.updateHeatPerFire()
    }

    get currentHeatDmgMod(): number
    {
        return ModHelper.calculateHeatMod(this.heat, this.maxHeatDmgMod)
    }

    get currentHeatGenMod(): number
    {
        return ModHelper.calculateHeatMod(this.heat, this.maxHeatGenMod)
    }

    get airTempHeatModifier()
    {
        const slope = (this.heatCurve[1].y - this.heatCurve[0].y) / (this.heatCurve[1].x - this.heatCurve[0].x)
        const yIntercept = this.heatCurve[1].y - slope * this.heatCurve[1].x

        return this.airTemp * slope + yIntercept
    }

    updateHeatPerFire() {
        if (this.lowHeatFire instanceof ProjectileHeat) {
            this.lowHeatFire.heatPerShot = this.lowHeatFire.baseHeatPerShot * this.airTempHeatModifier
        }
        if (this.lowHeatFire instanceof Beam && this.lowHeatFire.baseHeatPerSecond !== null) {
            this.lowHeatFire.heatPerSecond = this.lowHeatFire.baseHeatPerSecond * this.airTempHeatModifier
        }

        if (this.highHeatFire instanceof ProjectileHeat) {
            this.highHeatFire.heatPerShot = this.highHeatFire.baseHeatPerShot * this.airTempHeatModifier
        }
        if (this.highHeatFire instanceof Beam && this.highHeatFire.baseHeatPerSecond !== null) {
            this.highHeatFire.heatPerSecond = this.highHeatFire.baseHeatPerSecond * this.airTempHeatModifier
        }
    }
}
