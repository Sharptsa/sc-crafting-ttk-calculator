import AbstractDamageType from "./AbstractDamageType"
import type IHandlesHeat from "./IHandlesHeat"

export default class Beam extends AbstractDamageType implements IHandlesHeat {
    dps: number
    dmgInterval: number = 0.001
    baseHeatPerSecond: number | null
    heatPerSecond: number | null

    constructor(dps: number, baseHeatPerSecond: number | null = null) {
        super()
        this.dps = dps
        this.baseHeatPerSecond = baseHeatPerSecond
        this.heatPerSecond = baseHeatPerSecond
    }

    public getDpsWithMod(customDmgMod: number, heatDmgMod?: number | null): number {
        let dps = this.dps * customDmgMod

        if (heatDmgMod) {
            dps *= heatDmgMod
        }

        return dps
    }

    setHeatIncrement(airTempMod: number): void {
        if (this.baseHeatPerSecond !== null) {
            this.heatPerSecond = Math.max(0, this.baseHeatPerSecond * airTempMod)
        }
    }
}
