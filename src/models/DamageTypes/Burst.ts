export default class Burst {
    burstSize: number
    burstCooldown: number

    constructor(burstSize: number, burstCooldown: number) {
        this.burstSize = burstSize
        this.burstCooldown = burstCooldown
    }
}
