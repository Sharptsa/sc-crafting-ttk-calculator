export class Weapon {
    constructor() {
        this.alpha = null
        this.fire_rate = null
        this.craft_max_dmg_percent = 30
        this.craft_max_fire_rate_delta = null
        this.craft_damage_mod = 1
        this.craft_fire_rate_mod = 1
        this.barrel_size = null
        this.type = null
        this.burst_size = null
        this.burst_cooldown = null
        this.charge_time = null
        this.attachment = null
    }

    get craft_max_dmg_mod() {
        if (this.craft_dmg_mod === null) {
            return null
        }

        return 1 + (this.craft_max_dmg_mod / 100)
    }


    get craft_max_fire_rate_percent() {
        if (this.fire_rate === null || this.craft_max_fire_rate_delta === null) {
            return 20
        }

        return Number.parseFloat(this.craft_max_fire_rate_delta / this.fire_rate * 100).toFixed(1)
    }

    get total_alpha() {
        return Number.parseFloat(this.alpha * this.craft_damage_mod * (this.attachment?.dmg_mod ?? 1)).toFixed(1)
    }

    get total_fire_rate() {
        return Number.parseFloat(this.fire_rate * this.craft_fire_rate_mod  * (this.attachment?.fire_rate_mod ?? 1)).toFixed(1)
    }

    static fromJson(json) {
        let object = Object.assign(new Weapon(), json);

        return object
    }
}