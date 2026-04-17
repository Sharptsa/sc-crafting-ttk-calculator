const hp = 100
const headshotMod = 1.5
const limbMod = 0.8

export const calculateTTK = (weapon) => {
    /* ----------------
    ------ STATS ------
    ----------------- */
    let alpha = weapon.total_alpha
    let fire_rate = weapon.total_fire_rate

    let armorType = document.getElementById("armorType").value

    let armorMod
    let armorModMaxQ

    switch (armorType) {
        case 'no_armor':
            armorMod = 1
            armorModMaxQ = 1
            break
        case 'light':
            armorMod = 0.8
            armorModMaxQ = 0.78
            break
        case 'medium':
            armorMod = 0.7
            armorModMaxQ = 0.67
            break
        case 'heavy':
        default:
            armorMod = 0.6
            armorModMaxQ = 0.54
    }

    /* ----------------
    --- CALCULATION ---
    ----------------- */
    if (alpha == 0 || fire_rate == 0) {
        document.getElementById("totalFireRate").innerHTML = ''

        document.getElementById("ttkHead").innerHTML = ''
        document.getElementById("shotHead").innerHTML = ''
        document.getElementById("ttkHeadMaxQ").innerHTML = ''
        document.getElementById("shotHeadMaxQ").innerHTML = ''
        document.getElementById("damageHead").innerHTML = ''
        document.getElementById("damageHeadMaxQ").innerHTML = ''


        document.getElementById("ttkBody").innerHTML = ''
        document.getElementById("shotBody").innerHTML = ''
        document.getElementById("ttkBodyMaxQ").innerHTML = ''
        document.getElementById("shotBodyMaxQ").innerHTML = ''
        document.getElementById("damageBody").innerHTML = ''
        document.getElementById("damageBodyMaxQ").innerHTML = ''


        document.getElementById("ttkLimb").innerHTML = ''
        document.getElementById("shotLimb").innerHTML = ''
        document.getElementById("ttkLimbMaxQ").innerHTML = ''
        document.getElementById("shotLimbMaxQ").innerHTML = ''
        document.getElementById("damageLimb").innerHTML = ''
        document.getElementById("damageLimbMaxQ").innerHTML = ''

        return
    }

    const dmg = Number.parseFloat(alpha * armorMod).toFixed(1)
    const dmgMaxArmor = Number.parseFloat(alpha * armorModMaxQ).toFixed(1)

    const timeBetweenShot = 60 / fire_rate

    const head = compute(hp, dmg * headshotMod, timeBetweenShot, weapon.burst_size, weapon.burst_cooldown, weapon.charge_time)
    const headMaxArmor = compute(hp, dmgMaxArmor * headshotMod, timeBetweenShot, weapon.burst_size, weapon.burst_cooldown, weapon.charge_time)

    const body = compute(hp, dmg, timeBetweenShot, weapon.burst_size, weapon.burst_cooldown, weapon.charge_time)
    const bodyMaxArmor = compute(hp, dmgMaxArmor, timeBetweenShot, weapon.burst_size, weapon.burst_cooldown, weapon.charge_time)

    const limbs = compute(hp, dmg * limbMod, timeBetweenShot, weapon.burst_size, weapon.burst_cooldown, weapon.charge_time)
    const limbsMaxArmor = compute(hp, dmgMaxArmor * limbMod, timeBetweenShot, weapon.burst_size, weapon.burst_cooldown, weapon.charge_time)

    document.getElementById("totalFireRate").innerHTML = weapon.total_fire_rate + " rpm"

    document.getElementById("ttkHead").innerHTML = ttkStr(head.ttk)
    document.getElementById("shotHead").innerHTML = nbShotStr(head.nbShot)
    document.getElementById("ttkHeadMaxQ").innerHTML = ttkStr(headMaxArmor.ttk)
    document.getElementById("shotHeadMaxQ").innerHTML = nbShotStr(headMaxArmor.nbShot)
    document.getElementById("damageHead").innerHTML = Number.parseFloat(dmg * headshotMod).toFixed(1)
    document.getElementById("damageHeadMaxQ").innerHTML = Number.parseFloat(dmgMaxArmor * headshotMod).toFixed(1)


    document.getElementById("ttkBody").innerHTML = ttkStr(body.ttk)
    document.getElementById("shotBody").innerHTML = nbShotStr(body.nbShot)
    document.getElementById("ttkBodyMaxQ").innerHTML = ttkStr(bodyMaxArmor.ttk)
    document.getElementById("shotBodyMaxQ").innerHTML = nbShotStr(bodyMaxArmor.nbShot)
    document.getElementById("damageBody").innerHTML = Number.parseFloat(dmg).toFixed(1)
    document.getElementById("damageBodyMaxQ").innerHTML = Number.parseFloat(dmgMaxArmor).toFixed(1)


    document.getElementById("ttkLimb").innerHTML = ttkStr(limbs.ttk)
    document.getElementById("shotLimb").innerHTML = nbShotStr(limbs.nbShot)
    document.getElementById("ttkLimbMaxQ").innerHTML = ttkStr(limbsMaxArmor.ttk)
    document.getElementById("shotLimbMaxQ").innerHTML = nbShotStr(limbsMaxArmor.nbShot)
    document.getElementById("damageLimb").innerHTML = Number.parseFloat(dmg * limbMod).toFixed(1)
    document.getElementById("damageLimbMaxQ").innerHTML = Number.parseFloat(dmgMaxArmor * limbMod).toFixed(1)
}

const compute = (hp, dmg, timeBetweenShot, burstSize, burstCooldown, chargeTime) => {
    let ttk = 0
    let nbShot = 0

    while (hp > 0) {
        hp -= dmg

        if (nbShot > 0) {
            // Burst mode
            if (burstSize !== null && ((nbShot % burstSize) == 0)) {
                ttk += burstCooldown
                if (chargeTime !== null) {
                    ttk += chargeTime
                }
            }

            // Charged single  mode
            if (burstSize === null && chargeTime !== null) {
                ttk += chargeTime
            }

            ttk += timeBetweenShot
        }

        ++nbShot
    }

    return { ttk, nbShot }
}

/* ----------------
------RESULTS------
----------------- */
const nbShotStr = (nbShot) => {
    let str = nbShot + ' shot'
    if (nbShot > 1) {
        str += 's'
    }
    return '(' + str + ')'
}

const ttkStr = (ttk) => {
    return Number.parseFloat(ttk).toFixed(3) + "s"
}