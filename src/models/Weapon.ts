import {BarrelAttachment, BarrelAttachmentTypeEnum } from "./Attachement/BarrelAttachment"
import Crafting from "./Crafting"
import FireMode from "./FireMode"

export class Weapon {
    weaponName: string
    weaponClass: WeaponClassEnum

    barrelAttachmentType: BarrelAttachmentTypeEnum | null
    barrelSize: number
    barrelAttachment: BarrelAttachment | null = null

    crafting: Crafting

    fireModes: FireMode[]

    constructor(
        weaponName: string,
        weaponClass: WeaponClassEnum,
        barrelAttachmentType: BarrelAttachmentTypeEnum | null,
        barrelSize: number,
        crafting: Crafting,
        fireModes: FireMode[]
    ) {
        this.weaponName = weaponName
        this.weaponClass = weaponClass
        this.barrelAttachmentType = barrelAttachmentType
        this.barrelSize = barrelSize
        this.crafting = crafting
        this.fireModes = fireModes
    }

    public getWeaponModeFromName(modeName: string): FireMode {
        const weaponMode = this.fireModes.find(mode => mode.modeName === modeName)

        if (!weaponMode) {
            throw new Error(`Fire mode not found: ${modeName}`)
        }
        return weaponMode
    }

    public get customDmgMod() : number {
        return (this.barrelAttachment?.dmgMod ?? 1) * (this.crafting.dmgMod ?? 1)
    }
     public get customFireRateMod(): number {
        return (this.barrelAttachment?.fireRateMod ?? 1) * (this.crafting.fireRateMod ?? 1)
    }
}

export enum WeaponClassEnum {
    AssaultRifle = "Assault Rifle",
    SMG = "SMG",
    LMG = "LMG",
    SniperRifle = "Sniper Rifle",
    Shotgun = "Shotgun",
    Pistol = "Pistol"
}
