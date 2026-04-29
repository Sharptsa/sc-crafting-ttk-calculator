import AbstractDamageType from "./AbstractDamageType"

export class FireEvent {
    damageType: AbstractDamageType
    count: number

    constructor(damageType: AbstractDamageType, count: number = -1) {
        this.damageType = damageType
        this.count = count
    }
}

export class FireSequence extends AbstractDamageType {
    fireEvents: FireEvent[]

    constructor(fireEvents: FireEvent[]) {
        super()
        this.fireEvents = fireEvents
    }
}
