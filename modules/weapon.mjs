export class Weapon {
    constructor() {
        this.alpha = null
        this.charged_alpha = null
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
        this.heat = 0
        this.heat_per_shot = null
        this.overheat_cooldown = null
        this.heat_dmg_mod = null
        this.heat_fire_rate_mod = null
        this.heat_gen_mod = null
        this.heat_threshold = null
        this.beam_dps = null
        this.beam_heat_per_second = null
        this.beam_interval = null
        this.slug_alpha = null
        this.slug_fire_rate = null
        this.slug_heat_per_shot = null
        this.electron_charge_mod = null
        this.electron_dmg_per_charge = null
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
        return Number.parseFloat(this.alpha * this.craft_damage_mod * (this.attachment?.dmg_mod ?? 1)).toFixed(3)
    }

    get total_charged_alpha() {
        return Number.parseFloat(this.charged_alpha * this.craft_damage_mod * (this.attachment?.dmg_mod ?? 1)).toFixed(3)
    }

    get total_beam_alpha() {
        return Number.parseFloat(this.beam_dps * this.beam_interval * this.craft_damage_mod * (this.attachment?.dmg_mod ?? 1)).toFixed(6)
    }

    get total_slug_alpha() {
         return Number.parseFloat(this.slug_alpha * this.craft_damage_mod * (this.attachment?.dmg_mod ?? 1)).toFixed(3)
    }

    get total_fire_rate() {
        return Number.parseFloat(this.fire_rate * this.craft_fire_rate_mod  * (this.attachment?.fire_rate_mod ?? 1)).toFixed(1)
    }

    get total_slug_fire_rate() {
        return Number.parseFloat(this.slug_fire_rate * this.craft_fire_rate_mod  * (this.attachment?.fire_rate_mod ?? 1)).toFixed(1)
    }

    static fromJson(json) {
        let object = Object.assign(new Weapon(), json);

        return object
    }
}