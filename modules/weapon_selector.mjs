import { Weapon } from "./weapon.mjs"
import { Attachment } from "./attachment.mjs"
import * as Stats from "./stats_data.mjs"


export const weaponEventDispatcher = document.createTextNode('')

const weaponProxyHandler = {
    set(obj, prop, value) {
        obj[prop] = value;
        weaponEventDispatcher.dispatchEvent(new CustomEvent("weaponUpdated"));

        return true
    },

    get(target, prop, receiver) {
        return Reflect.get(...arguments);;
    },
};

export var selected_weapon = new Proxy(new Weapon(), weaponProxyHandler)

export const init = () => {
    initWeaponSelector()
    initBaseStatsInputs()
    initCraftingInputs()
    initAttachmentSelector()
}

const initWeaponSelector = () => {
    const weaponClassSelect = document.getElementById("weaponClass")
    const weaponSelect = document.getElementById("weapon")
    const weaponModeSelect = document.getElementById("weaponMode")

    const weaponAlpha = document.getElementById("weaponAlpha")
    const weaponFireRate = document.getElementById("weaponFireRate")
    const weaponBurstSize = document.getElementById("weaponBurstSize")
    const weaponBurstCooldown = document.getElementById("weaponBurstCooldown")
    const weaponChargeTime = document.getElementById("weaponChargeTime")

    var weaponClass = weaponClassSelect.value
    var weapon = weaponSelect.value
    var weaponMode = weaponSelect.value

    Object.keys(Stats.weapons).forEach(function (weaponClass) {
        Object.assign(weaponClassSelect.appendChild(document.createElement('option')), { value: weaponClass, text: weaponClass });
    })

    weaponClassSelect.addEventListener('change', (event) => {
        let tempWeapon = new Weapon()

        weaponClass = event.target.value

        weaponSelect.options.length = 1
        weaponModeSelect.options.length = 1
        weaponModeSelect.disabled = true

        if (weaponClass !== "Custom") {
            tempWeapon.barrel_size = 0

            weaponSelect.disabled = false

            Object.keys(Stats.weapons[weaponClass]).forEach(function (weapon) {
                Object.assign(weaponSelect.appendChild(document.createElement('option')), { value: weapon, text: weapon });
            })
            weaponSelect.selectedIndex = 0

            weaponAlpha.disabled = true
            weaponFireRate.disabled = true
            weaponBurstSize.disabled = true
            weaponBurstCooldown.disabled = true
            weaponChargeTime.disabled = true
        } else {
            weaponSelect.disabled = true

            weaponAlpha.disabled = false
            weaponFireRate.disabled = false
            weaponBurstSize.disabled = false
            weaponBurstCooldown.disabled = false
            weaponChargeTime.disabled = false
        }

        selectWeapon(tempWeapon)
    })

    weaponSelect.addEventListener('change', (event) => {
        weapon = event.target.value

        weaponModeSelect.options.length = 1

        if (weapon !== "") {
            Object.keys(Stats.weapons[weaponClass][weapon]).forEach(function (weaponMode) {
                Object.assign(weaponModeSelect.appendChild(document.createElement('option')), { value: weaponMode, text: weaponMode });
            })

            let availableWeaponModes = Object.values(Stats.weapons[weaponClass][weapon])

            weaponModeSelect.selectedIndex = 1

            if (availableWeaponModes.length > 1) {
                weaponModeSelect.disabled = false
                selectWeapon(Weapon.fromJson(availableWeaponModes[0]))
            } else {
                weaponModeSelect.disabled = true
                selectWeapon(Weapon.fromJson(availableWeaponModes[0]))
            }
        } else {
            weaponModeSelect.disabled = true
            weaponModeSelect.options.length = 1
            weaponModeSelect.selectedIndex = 0
        }
    })

    weaponModeSelect.addEventListener('change', (event) => {
        weaponMode = event.target.value
        selectWeapon(Weapon.fromJson(Stats.weapons[weaponClass][weapon][weaponMode]))
    })
}

const initBaseStatsInputs = () => {
    document.getElementById("weaponAlpha").addEventListener('input', (event) => {
        selected_weapon.alpha = event.target.value
    })

    document.getElementById("weaponFireRate").addEventListener('input', (event) => {
        selected_weapon.fire_rate = event.target.value
    })

    document.getElementById("weaponBurstSize").addEventListener('input', (event) => {
        selected_weapon.burst_size = event.target.value
    })

    document.getElementById("weaponBurstCooldown").addEventListener('input', (event) => {
        selected_weapon.burst_cooldown = event.target.value
    })

    document.getElementById("weaponChargeTime").addEventListener('input', (event) => {
        selected_weapon.charge_time = event.target.value
    })
}

const selectWeapon = (weapon) => {
    selected_weapon = new Proxy(weapon, weaponProxyHandler)
    weaponEventDispatcher.dispatchEvent(new CustomEvent("weaponUpdated"));

    updateSelectedWeaponStatsUi()
    loadAttachments()
}

const updateSelectedWeaponStatsUi = () => {
    document.getElementById("weaponAlpha").value = selected_weapon.alpha
    document.getElementById("weaponFireRate").value = selected_weapon.fire_rate
    document.getElementById("weaponBurstSize").value = selected_weapon.burst_size
    document.getElementById("weaponBurstCooldown").value = selected_weapon.burst_cooldown
    document.getElementById("weaponChargeTime").value = selected_weapon.charge_time

    let craftAlphaPercent = document.getElementById("craftAlphaPercent")
    let craftAlphaPercentRange = document.getElementById("craftAlphaPercentRange")
    craftAlphaPercent.value = 0
    craftAlphaPercentRange.setAttribute("max", selected_weapon.craft_max_dmg_percent)
    craftAlphaPercentRange.value = 0
    if (selected_weapon.craft_max_dmg_percent == 0) {
        craftAlphaPercent.disabled = true
        craftAlphaPercentRange.disabled = true
    }


    let craftFireRatePercent = document.getElementById("craftFireRatePercent")
    let craftFireRatePercentRange = document.getElementById("craftFireRatePercentRange")
    craftFireRatePercent.value = 0
    craftFireRatePercentRange.setAttribute("max", selected_weapon.craft_max_fire_rate_percent)
    craftFireRatePercentRange.value = 0
    if (selected_weapon.craft_max_fire_rate_percent == 0) {
        craftFireRatePercent.disabled = true
        craftFireRatePercentRange.disabled = true
    }
}

const initCraftingInputs = () => {

    const craftAlphaPercent = document.getElementById("craftAlphaPercent")
    const craftAlphaPercentRange = document.getElementById("craftAlphaPercentRange")

    craftAlphaPercent.addEventListener("input", (event) => {
        let alphaPercent = event.target.value

        craftAlphaPercentRange.value = alphaPercent
        selected_weapon.craft_damage_mod = Number.parseFloat(1 + (alphaPercent / 100)).toFixed(3)
    })
    craftAlphaPercentRange.addEventListener("input", (event) => {
        let alphaPercent = event.target.value

        craftAlphaPercent.value = alphaPercent
        selected_weapon.craft_damage_mod = Number.parseFloat(1 + (alphaPercent / 100)).toFixed(3)
    })

    const craftFireRatePercent = document.getElementById("craftFireRatePercent")
    const craftFireRatePercentRange = document.getElementById("craftFireRatePercentRange")

    craftFireRatePercent.addEventListener("input", (event) => {
        let fireRatePercent = event.target.value

        craftFireRatePercentRange.value = fireRatePercent
        selected_weapon.craft_fire_rate_mod = Number.parseFloat(1 + (fireRatePercent / 100)).toFixed(3)
    })
    craftFireRatePercentRange.addEventListener("input", (event) => {
        let alphaPercent = event.target.value

        craftFireRatePercent.value = alphaPercent
        selected_weapon.craft_fire_rate_mod = Number.parseFloat(1 + (alphaPercent / 100)).toFixed(3)
    })
}

const initAttachmentSelector = () => {
    loadAttachments()
}

const loadAttachments = () => {
    const attachmentList = document.getElementById("attachmentsList")

    attachmentList.innerHTML = ""

    let availableAttachments = Stats.attachments
    if (selected_weapon.barrel_size !== null) {
        availableAttachments = availableAttachments.filter((attachment) => attachment.size === selected_weapon.barrel_size || attachment.size === 0)
    }

    if (selected_weapon.type !== null) {
        availableAttachments = availableAttachments.filter((attachment) => attachment.type === selected_weapon.type || attachment.type === "all")
    }

    let attachmentGroups = Object.groupBy(availableAttachments, ({ size }) => size)

    Object.values(attachmentGroups).forEach((attachmentGroup) => {
        attachmentList.appendChild(makeAttachmentGroupElement(attachmentGroup))
    })
}

const makeAttachmentGroupElement = (attachments) => {
    let attachmentGroupElement = document.importNode(document.getElementById("attachmentGroupTemplate").content, true)

    attachments.forEach((attachment) => {
        let attachmentElement = makeAttachmentElement(attachment)
        attachmentGroupElement.querySelector("div").appendChild(attachmentElement)
    })

    return attachmentGroupElement
}

const makeAttachmentElement = (attachmentData) => {
    let attachmentElement = document.importNode(document.getElementById("attachmentTemplate").content, true)

    let radio = attachmentElement.querySelector("input")
    let label = attachmentElement.querySelector("label")

    let id = "att-" + attachmentData.name.toLowerCase().trim().replace(/["]/g, '').replace(/[\s-]+/g, '-')

    radio.id = id
    radio.setAttribute("data-dmg-mod", attachmentData.dmg_mod)
    radio.setAttribute("data-fire-rate-mod", attachmentData.fire_rate_mod)

    if (attachmentData.name === "None") {
        radio.checked = true
    }

    let attachmentStatsStr = []
    if (attachmentData.dmg_mod !== 1) {
        attachmentStatsStr.push(modToPercentStr(attachmentData.dmg_mod) + " dmg")
    }
    if (attachmentData.fire_rate_mod !== 1) {
        attachmentStatsStr.push(modToPercentStr(attachmentData.fire_rate_mod) + " rpm")
    }
    label.innerHTML = attachmentData.name
    if (attachmentStatsStr.length > 0) {
        label.innerHTML += " (" + attachmentStatsStr.join(", ") + ")"
    }

    label.setAttribute("for", id)

    radio.addEventListener('input', (event) => {
        selected_weapon.attachment = new Attachment(
            parseFloat(event.target.getAttribute("data-dmg-mod")),
            parseFloat(event.target.getAttribute("data-fire-rate-mod"))
        )
    })

    return attachmentElement
}

const modToPercentStr = (mod) => {
    let percent = Number.parseFloat((mod - 1) * 100).toFixed(1);
    return (percent < 0 ? "" : "+") + percent + "%"
}

document.getElementById('armorType').addEventListener('change', () => weaponEventDispatcher.dispatchEvent(new CustomEvent("weaponUpdated")))