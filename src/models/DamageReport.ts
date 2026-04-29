import type Target from "./Target/Target"

export default class DamageReport {
    target: Target

    firstShot = true

    ttk: number = 0

    shots: number = 0
    alternateShots: number = 0
    chargedShots: number = 0
    beamTime: number = 0
    electronDischarges: number = 0

    firstDmg:  number|null = null
    lastDmg: number|null = null

    firstAlternateDmg:  number|null = null
    lastAlternateDmg: number|null = null

    firstChargedDmg:  number|null = null
    lastChargedDmg: number|null = null

    firstFireRate: number|null = null
    lastFireRate: number|null = null

    firstChargedFireRate: number|null = null
    lastChargedFireRate: number|null = null

    firstBeamDps: number|null = null
    lastBeamDps: number|null = null

    electronDischargeDmg: number = 0

    reloads: number = 0

    overheat = 0

    constructor(target: Target) {
        this.target = target
    }

    reportShot(time: number, dmg: number, fireRate: number) {
        this.shots++

        if(this.firstDmg === null) {
            this.firstDmg = dmg
        }
        this.lastDmg = dmg

        if(this.firstFireRate === null) {
            this.firstFireRate = fireRate
        }
        this.lastFireRate = fireRate

        if(this.firstShot) {
            this.firstShot = false
            return
        }

        this.ttk += time
    }

    reportAlternateShot(time: number, alternateDmg: number, fireRate: number) {
        this.alternateShots++

        if(this.firstAlternateDmg === null) {
            this.firstAlternateDmg = alternateDmg
        }
        this.lastAlternateDmg = alternateDmg

        if(this.firstFireRate === null) {
            this.firstFireRate = fireRate
        }
        this.lastFireRate = fireRate

        if(this.firstShot) {
            this.firstShot = false
            return
        }

        this.ttk += time
    }

    reportChargedShot(time: number, chargedDmg: number, fireRate: number) {
        this.chargedShots++

        if(this.firstChargedDmg === null) {
            this.firstChargedDmg = chargedDmg
        }
        this.lastChargedDmg = chargedDmg

        if(this.firstChargedFireRate === null) {
            this.firstChargedFireRate = fireRate
        }
        this.lastChargedFireRate = fireRate

        if(this.firstShot) {
            this.firstShot = false
            return
        }

        this.ttk += time
    }

    reportBeam(time: number, beamDps: number) {
        this.ttk += time

        this.beamTime += time

        if(this.firstBeamDps === null) {
            this.firstBeamDps = beamDps
        }
        this.lastBeamDps = beamDps
    }

    reportElectronDischarge(electronDischargeDmg: number) {
        this.electronDischarges++
        this.electronDischargeDmg += electronDischargeDmg
    }

    reportOverheat(cooldown: number) {
        this.ttk += cooldown
        this.overheat ++
    }
}
