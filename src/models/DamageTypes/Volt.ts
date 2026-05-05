import ModHelper from "@/helpers/ModHelper"
import AbstractDamageType from "./AbstractDamageType"
import type IHandlesHeat from "./IHandlesHeat"

type CurvePoint = {
    x: number,
    y: number
}

export default class Volt extends AbstractDamageType {
    lowHeatFire: AbstractDamageType & IHandlesHeat
    highHeatFire: (AbstractDamageType & IHandlesHeat) | null
    heat: number = 0
    overheatCooldown: number
    heatThreshold: number
    maxHeatDmgMod: number
    maxHeatGenMod: number
    heatCurve: [CurvePoint, CurvePoint]
    airTemp: number = 20

    constructor(
        lowHeatFire: AbstractDamageType & IHandlesHeat,
        highHeatFire: (AbstractDamageType & IHandlesHeat) | null,
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

        this.updateHeatIncrements()
    }

    get currentHeatDmgMod(): number {
        return ModHelper.calculateHeatMod(this.heat, this.maxHeatDmgMod)
    }

    get currentHeatGenMod(): number {
        return ModHelper.calculateHeatMod(this.heat, this.maxHeatGenMod)
    }

    get airTempHeatModifier() {
        const slope = (this.heatCurve[1].y - this.heatCurve[0].y) / (this.heatCurve[1].x - this.heatCurve[0].x)
        const yIntercept = this.heatCurve[1].y - slope * this.heatCurve[1].x

        return this.airTemp * slope + yIntercept
    }

    updateHeatIncrements() {
        this.lowHeatFire.setHeatIncrement(this.airTempHeatModifier)

        if (this.highHeatFire !== null) {
            this.highHeatFire.setHeatIncrement(this.airTempHeatModifier)
        }
    }
}
