import * as Results from './results.mjs'

const maxHp = 100
const headshotMod = 1.5
const bodyMod = 1
const limbMod = 0.8

export const calculateTTK = (weapon) => {
    /* ----------------
    ------ STATS ------
    ----------------- */

    let armorType = document.getElementById("armorType").value

    let armorMod
    let armorModMaxQ

    switch (armorType) {
        case 'no_armor':
            armorMod = 1
            armorModMaxQ = 1
            break;
        case 'undersuit':
            armorMod = 0.9
            armorModMaxQ = 0.885
            break;
        case 'flight_suit':
            armorMod = 0.85
            armorModMaxQ = 0.8275
            break;
        case 'utility':
            armorMod = 0.75
            armorModMaxQ = 0.72
            break;
        case 'light':
            armorMod = 0.8
            armorModMaxQ = 0.78
            break
        case 'medium':
            armorMod = 0.7
            armorModMaxQ = 0.67
            break
        case 'npc_boss':
            armorMod = 0.25
            armorModMaxQ = 0.25
            break
        case 'heavy':
        default:
            armorMod = 0.6
            armorModMaxQ = 0.54
    }

    /* ----------------
    --- CALCULATION ---
    ----------------- */
    Results.resetResults()

    if (!weaponIsValid(weapon)) {
        return
    }

    const head = compute(weapon, armorMod, headshotMod)
    const headMaxArmor = compute(weapon, armorModMaxQ, headshotMod)

    const body = compute(weapon, armorMod, bodyMod)
    const bodyMaxArmor = compute(weapon, armorModMaxQ, bodyMod)

    const limbs = compute(weapon, armorMod, limbMod)
    const limbsMaxArmor = compute(weapon, armorModMaxQ, limbMod)

    Results.displayResults(head, headMaxArmor, body, bodyMaxArmor, limbs, limbsMaxArmor)
}

const weaponIsValid = (weapon) => {
    if (weapon.type === null) {
        return Boolean(weapon.alpha && weapon.fire_rate)
    }

    return true
}

const compute = (weapon, armorMod, bodyPartMod) => {
    switch (weapon.type) {
        case "volt":
            return computeVolt(weapon, armorMod, bodyPartMod)
        case "prism":
            return computePrism(weapon, armorMod, bodyPartMod)
        case "beam":
            return computeBeam(weapon, armorMod, bodyPartMod)
        case "zenith_special":
            return computeZenithSpecial(weapon, armorMod, bodyPartMod)
        case "electron":
            return computeElectron(weapon, armorMod, bodyPartMod)
        default:
            return computeStandard(weapon, armorMod, bodyPartMod)
    }
}

const computeStandard = (weapon, armorMod, bodyPartMod, initialHp = null, initialNbShot = 0) => {
    let currentHp = initialHp ?? maxHp
    let ttk = 0
    let nbShot = initialNbShot

    let dmg = getFinalDamage(weapon, armorMod, bodyPartMod)
    let fireRate = weapon.total_fire_rate
    let timeBetweenShot = 60 / fireRate

    while (currentHp > 0) {
        if (nbShot > 0) {
            // Burst mode
            if (weapon.burst_size !== null && ((nbShot % weapon.burst_size) == 0)) {
                ttk += weapon.burst_cooldown
                if (weapon.charge_time !== null) {
                    ttk += weapon.charge_time
                }
            }

            // Charged single  mode
            if (weapon.burst_size === null && weapon.charge_time !== null) {
                ttk += weapon.charge_time
            }

            ttk += timeBetweenShot
        }

        currentHp -= dmg

        ++nbShot
    }

    return { ttk, nbShot, dmg, fireRate }
}

const computeVolt = (weapon, armorMod, bodyPartMod) => {
    let currentHp = maxHp
    let ttk = 0
    let nbShot = 0
    let beamTime = 0
    let heat = weapon.heat

    let currentHeatDamageMod = getHeatMod(weapon.heat_dmg_mod, heat)
    let currentHeatFireRateMod = getHeatMod(weapon.heat_fire_rate_mod, heat)

    let baseDmg = getFinalDamage(weapon, armorMod, bodyPartMod)

    let initialDmg = baseDmg * currentHeatDamageMod
    let dmg = initialDmg

    let initialFireRate = weapon.total_fire_rate * currentHeatFireRateMod
    let fireRate = initialFireRate

    let timeBetweenShot = 60 / getFinalDamage(weapon, armorMod, bodyPartMod)

    while (currentHp > 0) {
        if (heat >= 100) {
            ttk += weapon.overheat_cooldown
            heat = 0
        }

        if (heat < weapon.heat_threshold) {
            fireRate = weapon.total_fire_rate * currentHeatFireRateMod
            timeBetweenShot = 60 / fireRate

            dmg = baseDmg * currentHeatDamageMod
            currentHp -= dmg

            if (nbShot > 0) {
                ttk += timeBetweenShot
            }

            currentHeatFireRateMod = getHeatMod(weapon.heat_fire_rate_mod, heat)

            heat += weapon.heat_per_shot * getHeatMod(weapon.heat_gen_mod, heat)

            currentHeatDamageMod = getHeatMod(weapon.heat_dmg_mod, heat)

            nbShot++
        } else {
            let beamResult = computeBeam(weapon, armorMod, bodyPartMod, currentHp, heat)

            ttk += beamResult.ttk

            let beamTime = beamResult.beamTime
            let initialBeamDmg = beamResult.initialBeamDmg
            let beamDmg = beamResult.beamDmg

            return { ttk, nbShot, beamTime, initialDmg, dmg, initialBeamDmg, beamDmg, initialFireRate, fireRate }
        }
    }

    return { ttk, nbShot, beamTime, initialDmg, dmg, initialFireRate, fireRate }
}

const computeBeam = (weapon, armorMod, bodyPartMod, initialHp = null, initialHeat = null) => {
    let currentHp = initialHp ?? maxHp
    let ttk = 0
    let heat = initialHeat ?? weapon.heat

    let currentHeatDamageMod = getHeatMod(weapon.heat_dmg_mod, heat)
    let currentHeatFireRateMod = getHeatMod(weapon.heat_fire_rate_mod, heat)

    let baseBeamDmg = getFinalBeamDamage(weapon, armorMod, bodyPartMod)
    let initialBeamDmg = baseBeamDmg * currentHeatDamageMod
    let beamDmg = initialBeamDmg

    let beamHeatPerTic = weapon.beam_heat_per_second * weapon.beam_interval

    while (currentHp > 0) {
        if (heat >= 100) {
            ttk += weapon.overheat_cooldown
            heat = 0
        }

        beamDmg = baseBeamDmg * currentHeatDamageMod
        currentHp -= beamDmg

        ttk += weapon.beam_interval

        currentHeatFireRateMod = getHeatMod(weapon.heat_fire_rate_mod, heat)

        heat += beamHeatPerTic * getHeatMod(weapon.heat_gen_mod, heat)

        currentHeatDamageMod = getHeatMod(weapon.heat_dmg_mod, heat)
    }

    let beamTime = ttk

    return { ttk, beamTime, initialBeamDmg, beamDmg }
}

const computePrism = (weapon, armorMod, bodyPartMod) => {
    let currentHp = maxHp
    let ttk = 0
    let nbShot = 0
    let nbShotSlug = 0
    let heat = weapon.heat

    let dmg = getFinalDamage(weapon, armorMod, bodyPartMod)
    let slugDmg = getFinalSlugDamage(weapon, armorMod, bodyPartMod)

    let timeBetweenShot = 60 / weapon.total_fire_rate
    let timeBetweenShotSlug = 60 / weapon.total_slug_fire_rate

    while (currentHp > 0) {
        console.log(heat)
        if (heat >= 100) {
            ttk += weapon.overheat_cooldown
            heat = 0
        }

        if (heat < weapon.heat_threshold) {
            currentHp -= dmg

            if (nbShot > 0) {
                ttk += timeBetweenShot
            }

            heat += weapon.heat_per_shot

            nbShot++
        } else {
            currentHp -= slugDmg

            if (nbShot > 0 || nbShotSlug > 0) {
                ttk += timeBetweenShotSlug
            }

            heat += weapon.slug_heat_per_shot

            nbShotSlug++
        }
    }

    return { ttk, nbShot, nbShotSlug, dmg, slugDmg }
}

const computeZenithSpecial = (weapon, armorMod, bodyPartMod) => {
    let currentHp = maxHp
    let ttk = 0
    let nbShot = 0

    let dmg = getFinalDamage(weapon, armorMod, bodyPartMod)
    let chargedDmg = getFinalChargedDamage(weapon, armorMod, bodyPartMod)

    let fireRate = weapon.total_fire_rate

    currentHp -= chargedDmg

    nbShot++

    if (currentHp > 0) {
        let singleResult = computeStandard(weapon, armorMod, bodyPartMod, currentHp, nbShot)

        ttk += singleResult.ttk
        nbShot += singleResult.nbShot
    }

    return { ttk, nbShot, dmg, fireRate, chargedDmg }
}

const computeElectron = (weapon, armorMod, bodyPartMod) => {
    let currentHp = maxHp
    let ttk = 0
    let nbShot = 0
    let electronCharged = false
    let electronTotalDamage = 0

    let dmg = getFinalDamage(weapon, armorMod, bodyPartMod)
    let electronDamage = dmg * weapon.electron_charge_mod * weapon.electron_dmg_per_charge
    let fireRate = weapon.total_fire_rate
    let timeBetweenShot = 60 / fireRate

    while (currentHp > 0) {
        if (nbShot > 0) {
            ttk += timeBetweenShot
        } 

        currentHp -=  dmg

        if (electronCharged) {
            currentHp -= electronDamage
            electronTotalDamage += electronDamage
        }

        electronCharged = !electronCharged

        ++nbShot
    }

    return { ttk, nbShot, dmg, fireRate, electronTotalDamage }
}

const getFinalDamage = (weapon, armorMod, bodyPartMod) => {
    return Number.parseFloat(weapon.total_alpha * armorMod * bodyPartMod).toFixed(3)
}

const getFinalChargedDamage = (weapon, armorMod, bodyPartMod) => {
    return Number.parseFloat(weapon.total_charged_alpha * armorMod * bodyPartMod).toFixed(3)
}

const getFinalBeamDamage = (weapon, armorMod, bodyPartMod) => {
    return Number.parseFloat(weapon.total_beam_alpha * armorMod * bodyPartMod).toFixed(6)
}

const getFinalSlugDamage = (weapon, armorMod, bodyPartMod) => {
    return Number.parseFloat(weapon.total_slug_alpha * armorMod * bodyPartMod).toFixed(3)
}

const getHeatMod = (mod, heat) => {
    return Number.parseFloat(((mod - 1) * heat / 100) + 1).toFixed(6)
}