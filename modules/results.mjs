const ttkHead = document.getElementById("ttkHead")
const shotHead = document.getElementById("shotHead")
const ttkHeadMaxQ = document.getElementById("ttkHeadMaxQ")
const shotHeadMaxQ = document.getElementById("shotHeadMaxQ")
const damageListHead = document.getElementById("damageListHead")
const damageListHeadMaxQ = document.getElementById("damageListHeadMaxQ")
const fireRateHead = document.getElementById("fireRateHead")
const fireRateHeadMaxQ = document.getElementById("fireRateHeadMaxQ")

const ttkBody = document.getElementById("ttkBody")
const shotBody = document.getElementById("shotBody")
const ttkBodyMaxQ = document.getElementById("ttkBodyMaxQ")
const shotBodyMaxQ = document.getElementById("shotBodyMaxQ")
const damageListBody = document.getElementById("damageListBody")
const damageListBodyMaxQ = document.getElementById("damageListBodyMaxQ")
const fireRateBody = document.getElementById("fireRateBody")
const fireRateBodyMaxQ = document.getElementById("fireRateBodyMaxQ")

const ttkLimb = document.getElementById("ttkLimb")
const shotLimb = document.getElementById("shotLimb")
const ttkLimbMaxQ = document.getElementById("ttkLimbMaxQ")
const shotLimbMaxQ = document.getElementById("shotLimbMaxQ")
const damageListLimb = document.getElementById("damageListLimb")
const damageListLimbMaxQ = document.getElementById("damageListLimbMaxQ")
const fireRateLimb = document.getElementById("fireRateLimb")
const fireRateLimbMaxQ = document.getElementById("fireRateLimbMaxQ")

export const displayResults = (headResults, headMaxQResults, bodyResults, bodyMaxQResults, limbResults, limbMaxQResults) => {
    ttkHead.innerHTML = ttkString(headResults.ttk)
    shotHead.innerHTML = nbDamageInstances(headResults)
    fillDamageList(damageListHead, headResults)
    fireRateHead.innerHTML = fireRateString(headResults)

    ttkHeadMaxQ.innerHTML = ttkString(headMaxQResults.ttk)
    shotHeadMaxQ.innerHTML = nbDamageInstances(headMaxQResults)
    fillDamageList(damageListHeadMaxQ, headMaxQResults)
    fireRateHeadMaxQ.innerHTML = fireRateString(headMaxQResults)


    ttkBody.innerHTML = ttkString(bodyResults.ttk)
    shotBody.innerHTML = nbDamageInstances(bodyResults)
    fillDamageList(damageListBody, bodyResults)
    fireRateBody.innerHTML = fireRateString(bodyResults)

    ttkBodyMaxQ.innerHTML = ttkString(bodyMaxQResults.ttk)
    shotBodyMaxQ.innerHTML = nbDamageInstances(bodyMaxQResults)
    fillDamageList(damageListBodyMaxQ, bodyMaxQResults)
    fireRateBodyMaxQ.innerHTML = fireRateString(bodyMaxQResults)

    ttkLimb.innerHTML = ttkString(limbResults.ttk)
    shotLimb.innerHTML = nbDamageInstances(limbResults)
    fillDamageList(damageListLimb, limbResults)
    fireRateLimb.innerHTML = fireRateString(limbResults)

    ttkLimbMaxQ.innerHTML = ttkString(limbMaxQResults.ttk)
    shotLimbMaxQ.innerHTML = nbDamageInstances(limbMaxQResults)
    fillDamageList(damageListLimbMaxQ, limbMaxQResults)
    fireRateLimbMaxQ.innerHTML = fireRateString(limbMaxQResults)
}

const nbDamageInstances = (result) => {
    let instances = []
    if (result.nbShot > 0) {
        let shotStr = result.nbShot + ' shot'
        if (result.nbShot > 1) {
            shotStr += 's'
        }
        instances.push(shotStr)
    }

    if ((result.nbShotSlug ?? 0) > 0) {
        let shotSlugStr = result.nbShotSlug + ' slug shot'
        if (result.nbShotSlug > 1) {
            shotSlugStr += 's'
        }
        instances.push(shotSlugStr)
    }

    if ((result.beamTime ?? 0) > 0) {
        instances.push(Number.parseFloat(result.beamTime).toFixed(3) + 's of beam')
    }

    return '(' + instances.join(" + ") + ')'
}

const ttkString = (ttk) => {
    return Number.parseFloat(ttk).toFixed(3) + "s"
}

const fillDamageList = (damageListElement, result) => {
    if (result.dmg) {
        let shotStr = 'Per shot = '
        if (result.initialDmg && result.initialDmg !== result.dmg) {
            shotStr += Number.parseFloat(result.initialDmg).toFixed(1) + '- '
        }
        shotStr += Number.parseFloat(result.dmg).toFixed(1)
        
        let shotElement = document.createElement("li")
        shotElement.innerHTML = shotStr
        damageListElement.appendChild(shotElement)
    }

    if (result.alternateDmg) {
        let alternativeShotStr = 'Per alternate shot = ' + Number.parseFloat(result.alternateDmg).toFixed(1)
       
        let alternateShotElement = document.createElement("li")
        alternateShotElement.innerHTML = alternativeShotStr
        damageListElement.appendChild(alternateShotElement)
    }

    if (result.chargedDmg) {
        let chargedShotStr = 'Per charged shot = ' + Number.parseFloat(result.chargedDmg).toFixed(1)
       
        let chargedShotElement = document.createElement("li")
        chargedShotElement.innerHTML = chargedShotStr
        damageListElement.appendChild(chargedShotElement)
    }

    if (result.slugDmg) {
        let slugShotStr = 'Per slug shot = ' + Number.parseFloat(result.dmg).toFixed(1)
        
        let slugElement = document.createElement("li")
        slugElement.innerHTML = slugShotStr
        damageListElement.appendChild(slugElement)
    }

    if (result.beamDmg) {
        let beamStr = 'Beam DPS = '
        if (result.initialBeamDmg && result.initialBeamDmg !== result.beamDmg) {
            beamStr += Number.parseFloat(result.initialBeamDmg * 1000).toFixed(1) + '- '
        }
        beamStr += Number.parseFloat(result.beamDmg * 1000).toFixed(1)
        
        let beamElement = document.createElement("li")
        beamElement.innerHTML = beamStr
        damageListElement.appendChild(beamElement)
    }

    if (result.electronTotalDamage) {
        let electronStr = 'Electron charge total damage = ' + Number.parseFloat(result.electronTotalDamage).toFixed(1)
        
        let electronElement = document.createElement("li")
        electronElement.innerHTML = electronStr
        damageListElement.appendChild(electronElement)
    }
} 

const fireRateString = (result) => {
    if (!result.fireRate) {
        return 'N/A';
    }
    let fireRateStr = ''
    if (result.initialFireRate && result.initialFireRate !== result.fireRate) {
        fireRateStr += Number.parseFloat(result.initialFireRate).toFixed(1) + '- '
    }
    fireRateStr += Number.parseFloat(result.fireRate).toFixed(1)
    
    return fireRateStr
} 

export const resetResults = () => {    
    ttkHead.innerHTML = ''
    shotHead.innerHTML = ''
    ttkHeadMaxQ.innerHTML = ''
    shotHeadMaxQ.innerHTML = ''
    damageListHead.innerHTML = ''
    damageListHeadMaxQ.innerHTML = ''
    fireRateHead.innerHTML = ''
    fireRateHeadMaxQ.innerHTML = ''

    ttkBody.innerHTML = ''
    shotBody.innerHTML = ''
    ttkBodyMaxQ.innerHTML = ''
    shotBodyMaxQ.innerHTML = ''
    damageListBody.innerHTML = ''
    damageListBodyMaxQ.innerHTML = ''
    fireRateBody.innerHTML = ''
    fireRateBodyMaxQ.innerHTML = ''

    ttkLimb.innerHTML = ''
    shotLimb.innerHTML = ''
    ttkLimbMaxQ.innerHTML = ''
    shotLimbMaxQ.innerHTML = ''
    damageListLimb.innerHTML = ''
    damageListLimbMaxQ.innerHTML = ''
    fireRateLimb.innerHTML = ''
    fireRateLimbMaxQ.innerHTML = ''
}
