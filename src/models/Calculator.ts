import DamageReport from "./DamageReport";
import type AbstractDamageType from "./DamageTypes/AbstractDamageType";
import { FireEvent, FireSequence } from "./DamageTypes/FireSequence";
import Projectile from "./DamageTypes/Projectile";
import ProjectileAlternate from "./DamageTypes/ProjectileAlternate";
import ProjectileCharged from "./DamageTypes/ProjectileCharged";
import ProjectileElectron from "./DamageTypes/ProjectileElectron";
import ProjectileHeat from "./DamageTypes/ProjectileHeat";
import ProjectileHeatCharged from "./DamageTypes/ProjectileHeatCharged";
import Volt from "./DamageTypes/Volt";
import type FireMode from "./FireMode";
import type Target from "./Target/Target";
import type { Weapon } from "./Weapon";
import Beam from "./DamageTypes/Beam";

export default class Calculator {
    calculateTTK(target: Target, weapon: Weapon, fireMode: FireMode): DamageReport {
        const damageReport = new DamageReport(target)

        const computeMethod = getComputeMethod(target, weapon, fireMode.damageType, damageReport)

        while (target.currentHp > 0) {
            computeMethod.computeDamage()
        }

        return damageReport
    }
}

function getComputeMethod(
    target: Target,
    weapon: Weapon,
    damageType: AbstractDamageType,
    damageReport: DamageReport
): AbstractComputeMethod<AbstractDamageType> {
    switch (damageType.constructor) {
        case Projectile:
            return new ProjectileCompute(target, weapon, damageType as Projectile, damageReport)
        case ProjectileAlternate:
            return new ProjectileAlternateCompute(target, weapon, damageType as ProjectileAlternate, damageReport)
        case ProjectileCharged:
            return new ProjectileChargedCompute(target, weapon, damageType as ProjectileCharged, damageReport)
        case ProjectileElectron:
            return new ProjectileElectronCompute(target, weapon, damageType as ProjectileElectron, damageReport)
        case Beam:
            return new BeamCompute(target, weapon, damageType as Beam, damageReport)
        case Volt:
            return new VoltCompute(target, weapon, damageType as Volt, damageReport)
        case FireSequence:
            return new FireSequenceCompute(target, weapon, damageType as FireSequence, damageReport)
        default:
            throw Error('Unknown damage type: ' + damageType.constructor)
    }
}

function getHeatComputeMethod(
    target: Target,
    weapon: Weapon,
    heatDamageType: AbstractDamageType,
    damageReport: DamageReport,
    voltParent: Volt
): AbstractComputeMethod<AbstractDamageType> {
    switch (heatDamageType.constructor) {
        case FireSequence:
            return new FireSequenceCompute(target, weapon, heatDamageType as FireSequence, damageReport, voltParent)
        case ProjectileHeat:
            return new ProjectileHeatCompute(target, weapon, heatDamageType as ProjectileHeat, damageReport, voltParent);
        case ProjectileHeatCharged:
            return new ProjectileHeatChargedCompute(target, weapon, heatDamageType as ProjectileHeatCharged, damageReport, voltParent);
        case Beam:
            return new BeamCompute(target, weapon, heatDamageType as Beam, damageReport, voltParent);
        default:
            throw Error('Unexpected Volt damage type: ' + heatDamageType.constructor)
    }
}

abstract class AbstractComputeMethod<T extends AbstractDamageType> {
    target: Target
    weapon: Weapon
    damageType: T
    damageReport: DamageReport

    constructor(target: Target, weapon: Weapon, damageType: T, damageReport: DamageReport) {
        this.target = target
        this.weapon = weapon
        this.damageType = damageType
        this.damageReport = damageReport
    }

    abstract computeDamage(): void
}

class ProjectileCompute<T extends Projectile> extends AbstractComputeMethod<T> {
    burstCount: number = 0

    computeDamage(): void {
        const alpha = this.getAlpha()
        const fireRate = this.getFireRate()

        const timeBetweenShots = this.getTimeBetweenShots()

        const dmg = this.target.damage(alpha)

        if (this.projectile.burst !== null) {
            this.burstCount++
        }

        this.reportDamage(dmg, fireRate, timeBetweenShots)
    }

    get projectile(): T {
        return this.damageType
    }

    getAlpha(): number {
        return this.projectile.getAlphaWithMod(this.weapon.customDmgMod)
    }

    getFireRate(): number {
        return this.projectile.getFireRateWithMod(this.weapon.customFireRateMod)
    }

    getTimeBetweenShots(): number {
        let time = 60 / this.getFireRate()

        if (this.projectile.burst !== null && this.burstCount >= this.projectile.burst.burstSize) {
            time += this.projectile.burst.burstCooldown
            this.burstCount = 0
        }

        return time
    }

    reportDamage(dmg: number, fireRate: number, timeBetweenShots: number) {
        this.damageReport.reportShot(timeBetweenShots, dmg, fireRate)
    }
}

class ProjectileAlternateCompute extends ProjectileCompute<ProjectileAlternate> {
    alternateShot = false

    computeDamage(): void {
        super.computeDamage()
        this.alternateShot = !this.alternateShot
    }

    getAlpha(): number {
        return !this.alternateShot
            ? this.projectile.getAlphaWithMod(this.weapon.customDmgMod)
            : this.projectile.getSecondaryAlphaWithMod(this.weapon.customDmgMod)
    }

    reportDamage(dmg: number, fireRate: number, timeBetweenShots: number) {
        if (!this.alternateShot) {
            this.damageReport.reportShot(timeBetweenShots, dmg, fireRate)
        } else {
            this.damageReport.reportAlternateShot(timeBetweenShots, dmg, fireRate)
        }
    }

}

class ProjectileChargedCompute extends ProjectileCompute<ProjectileCharged> {
    computeDamage(): void {
        super.computeDamage()
    }

    getTimeBetweenShots(): number {
        const baseTime = 60 / this.getFireRate();

        if (this.projectile.burst !== null) {
            if (this.burstCount >= this.projectile.burst.burstSize) {
                this.burstCount = 0
                return baseTime + this.projectile.burst.burstCooldown + this.projectile.chargeTime
            }
            return baseTime
        }

        return baseTime + this.projectile.chargeTime
    }

    reportDamage(dmg: number, fireRate: number, timeBetweenShots: number) {
        this.damageReport.reportChargedShot(timeBetweenShots, dmg, fireRate)
    }
}

class ProjectileElectronCompute extends ProjectileCompute<ProjectileElectron> {
    dischargeReady = false
    computeDamage(): void {
        if (this.target.electronCharges === 0) {
            super.computeDamage()
            this.target.electronCharges = this.getAlpha() * this.projectile.electronChargeMod
        } else {
            if (!this.dischargeReady) {
                super.computeDamage()
                this.dischargeReady = true
                return
            } else {
                const electronDmg = this.target.damage(this.projectile.electronDmgPerCharge * this.target.electronCharges)
                this.target.electronCharges = 0
                this.damageReport.reportElectronDischarge(electronDmg)
                this.dischargeReady = false
            }
        }
    }
}

class ProjectileHeatCompute<T extends ProjectileHeat> extends ProjectileCompute<T> {
    voltParent: Volt

    constructor(target: Target, weapon: Weapon, projectile: T, damageReport: DamageReport, voltParent: Volt) {
        super(target, weapon, projectile, damageReport)
        this.voltParent = voltParent
    }

    computeDamage(): void {
        super.computeDamage()
        this.voltParent.heat += this.getHeatPerShot()
    }

    getAlpha(): number {
        return this.projectile.getAlphaWithMod(this.weapon.customDmgMod, this.voltParent.currentHeatDmgMod)
    }

    getFireRate(): number {
        return this.projectile.getFireRateWithMod(
            this.weapon.customFireRateMod,
            Math.max(0, this.voltParent.heat - this.getHeatPerShot()) // Fire rate should always be calculated from previous shot
        )
    }

    getHeatPerShot(): number {
        return this.projectile.heatPerShot * this.voltParent.currentHeatGenMod
    }

    getTimeBetweenShots(): number {
        if (this.voltParent.heat >= 100) {
            this.voltParent.heat = 0
            this.damageReport.reportOverheat(this.voltParent.overheatCooldown)
        }

        return super.getTimeBetweenShots()
    }
}

class ProjectileHeatChargedCompute extends ProjectileHeatCompute<ProjectileHeatCharged> {
    getTimeBetweenShots(): number {
        return 60 / this.getFireRate() + this.projectile.chargeTime
    }

    reportDamage(dmg: number, fireRate: number, timeBetweenShots: number) {
        this.damageReport.reportChargedShot(timeBetweenShots, dmg, fireRate)
    }
}

class BeamCompute extends AbstractComputeMethod<Beam> {
    voltParent: Volt | null

    get beam(): Beam {
        return this.damageType
    }

    constructor(target: Target, weapon: Weapon, beam: Beam, damageReport: DamageReport, voltParent: Volt | null = null) {
        super(target, weapon, beam, damageReport)
        this.voltParent = voltParent
    }

    computeDamage(): void {
        const beamDps = this.beam.getDpsWithMod(this.weapon.customDmgMod, this.voltParent?.currentHeatDmgMod)
        const instantAlpha = beamDps * this.beam.dmgInterval

        this.target.damage(instantAlpha)

        if (this.voltParent !== null && this.voltParent.heat >= 100) {
            this.voltParent.heat = 0
            this.damageReport.reportOverheat(this.voltParent.overheatCooldown)
        }

        this.damageReport.reportBeam(this.beam.dmgInterval, beamDps)

        if (this.voltParent && this.beam.heatPerSecond) {
            this.voltParent.heat += this.beam.heatPerSecond * this.voltParent.currentHeatGenMod * this.beam.dmgInterval
        }
    }
}

class VoltCompute extends AbstractComputeMethod<Volt> {
    lowHeatFireMethod: AbstractComputeMethod<AbstractDamageType>
    highHeatFireMethod: AbstractComputeMethod<AbstractDamageType> | null = null

    constructor(target: Target, weapon: Weapon, volt: Volt, damageReport: DamageReport) {
        super(target, weapon, volt, damageReport)
        this.lowHeatFireMethod = getHeatComputeMethod(target, weapon, volt.lowHeatFire, damageReport, volt)
        if (volt.highHeatFire !== null) {
            this.highHeatFireMethod = getHeatComputeMethod(target, weapon, volt.highHeatFire, damageReport, volt)
        }
    }

    get volt() {
        return this.damageType
    }

    computeDamage(): void {
        if (this.highHeatFireMethod === null || this.volt.heat < this.volt.heatThreshold) {
            this.lowHeatFireMethod.computeDamage()
            return
        }

        this.highHeatFireMethod.computeDamage()
    }
}
class FireSequenceCompute extends AbstractComputeMethod<FireSequence> {
    voltParent: Volt | null

    sequenceCount: number = 0
    fireEventIndex: number = 0
    currentFireEvent: FireEvent
    currentFireEventMethod: AbstractComputeMethod<AbstractDamageType>

    constructor(target: Target, weapon: Weapon, fireSequence: FireSequence, damageReport: DamageReport, voltParent: Volt | null = null) {
        super(target, weapon, fireSequence, damageReport)
        this.voltParent = voltParent

        if (fireSequence.fireEvents[this.fireEventIndex] === undefined) {
            throw Error("Fire sequence has no fire event")
        }

        this.currentFireEvent = this.fireSequence.fireEvents[this.fireEventIndex] as FireEvent
        this.currentFireEventMethod = this.getCurrentTypeComputeMethod()
    }

    get fireSequence() {
        return this.damageType
    }

    computeDamage(): void {
        if (this.currentFireEvent.count !== -1 && this.sequenceCount >= this.currentFireEvent.count) {
            this.fireEventIndex++
            if (this.fireSequence.fireEvents[this.fireEventIndex] === undefined) {
                throw Error("Fire sequence has no next event")
            }
            this.currentFireEvent = this.fireSequence.fireEvents[this.fireEventIndex] as FireEvent
            this.currentFireEventMethod = this.getCurrentTypeComputeMethod()
        }

        this.currentFireEventMethod.computeDamage()
        this.sequenceCount++
    }

    getCurrentTypeComputeMethod(): AbstractComputeMethod<typeof this.currentFireEvent.damageType> {
        if (this.voltParent !== null) {
            return getHeatComputeMethod(this.target, this.weapon, this.currentFireEvent.damageType, this.damageReport, this.voltParent)
        }

        return getComputeMethod(this.target, this.weapon, this.currentFireEvent, this.damageReport)
    }
}
