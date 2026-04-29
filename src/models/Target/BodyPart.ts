export class BodyPart {
    name: BodyPartEnum
    dmgMod: number
    nakedDmgMod: number

    constructor(name: BodyPartEnum, dmgMod: number, nakedDmgMod: number) {
        this.name = name
        this.dmgMod = dmgMod
        this.nakedDmgMod = nakedDmgMod
    }

    static head() {
        return new BodyPart(BodyPartEnum.Head, 1.5, 4)
    }

    static body() {
        return new BodyPart(BodyPartEnum.Body, 1, 2)
    }

    static limbs() {
        return new BodyPart(BodyPartEnum.Limbs, 0.8, 1.5)
    }
}

export enum BodyPartEnum {
    Head = "Head",
    Body = "Body",
    Limbs = "Limbs"
}
