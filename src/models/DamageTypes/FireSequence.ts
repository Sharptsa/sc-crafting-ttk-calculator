import AbstractDamageType from "./AbstractDamageType"
import type IHandlesHeat from "./IHandlesHeat"

export class FireEvent {
    damageType: AbstractDamageType
    count: number

    constructor(damageType: AbstractDamageType, count: number = -1) {
        this.damageType = damageType
        this.count = count
    }
}

export class FireSequence extends AbstractDamageType implements IHandlesHeat {
    fireEvents: FireEvent[]

    constructor(fireEvents: FireEvent[]) {
        super()
        this.fireEvents = fireEvents
    }

    setHeatIncrement(airTempMod: number): void {
        this.fireEvents.forEach((fireEvent) => {
            if ((fireEvent.damageType as IHandlesHeat).setHeatIncrement !== undefined) {
                (fireEvent.damageType as IHandlesHeat).setHeatIncrement(airTempMod)
            }
        })
    }
}
