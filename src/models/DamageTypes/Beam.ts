import AbstractDamageType from "./AbstractDamageType"

export default class Beam extends AbstractDamageType {
    dps: number
    dmgInterval: number = 0.001
    heatPerSecond: number | null

    constructor(beamDps: number, beamHeatPerSecond: number | null = null) {
        super()
        this.dps = beamDps
        this.heatPerSecond = beamHeatPerSecond
    }

    public getDpsWithMod(customDmgMod: number, heatDmgMod?: number|null): number {
        let dps = this.dps * customDmgMod

        if(heatDmgMod) {
            dps *= heatDmgMod
        }

        return dps
    }
}
