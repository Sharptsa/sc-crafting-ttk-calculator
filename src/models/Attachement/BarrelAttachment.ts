export class BarrelAttachment {
    name: string
    type: BarrelAttachmentTypeEnum
    size: number
    dmgMod: number
    fireRateMod: number

    constructor(name: string, type: BarrelAttachmentTypeEnum, size: number, dmgMod: number, fireRateMod: number) {
        this.name = name
        this.type = type
        this.size = size
        this.dmgMod = dmgMod
        this.fireRateMod = fireRateMod
    }
}

export enum BarrelAttachmentTypeEnum {
  Ballistic = "ballistic",
  Energy = "energy",
  All = "all"
}
