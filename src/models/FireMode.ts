import AbstractDamageType from "./DamageTypes/AbstractDamageType";
export default class FireMode {
    modeName: string
    damageType: AbstractDamageType

    constructor(modeName: string, damageType: AbstractDamageType) {
        this.modeName = modeName
        this.damageType = damageType
    }
}
