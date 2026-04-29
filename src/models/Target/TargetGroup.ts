import type Target from "./Target"

export default class TargetGroup {
    id: string
    targets: {id: string, target: Target}[]

    constructor(id: string, targets: {id: string, target: Target}[]) {
        this.id = id
        this.targets = targets
    }
}
