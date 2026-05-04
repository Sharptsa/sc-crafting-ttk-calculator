import { Weapon, WeaponClassEnum } from "@/models/Weapon"
import { BarrelAttachmentTypeEnum } from "@/models/Attachement/BarrelAttachment"
import Beam from "@/models/DamageTypes/Beam"
import Burst from "@/models/DamageTypes/Burst"
import Crafting from "@/models/Crafting"
import FireMode from "@/models/FireMode"
import Projectile from "@/models/DamageTypes/Projectile"
import ProjectileAlternate from "@/models/DamageTypes/ProjectileAlternate"
import ProjectileCharged from "@/models/DamageTypes/ProjectileCharged"
import ProjectileElectron from "@/models/DamageTypes/ProjectileElectron"
import ProjectileHeat from "@/models/DamageTypes/ProjectileHeat"
import ProjectileHeatCharged from "@/models/DamageTypes/ProjectileHeatCharged"
import Volt from "@/models/DamageTypes/Volt"
import { FireEvent, FireSequence } from "@/models/DamageTypes/FireSequence"

export default class WeaponCollection {
    weaponsList: Weapon[]

    constructor() {
        this.weaponsList = weaponCollection()
    }

    getWeaponsFromClass(weaponClass: WeaponClassEnum): Weapon[] {
        return this.weaponsList.filter((weapon: Weapon) => weapon.weaponClass === weaponClass)
    }

    getWeaponFromName(weaponName: string): Weapon {
        const weapon = this.weaponsList.find((weapon: Weapon) => weapon.weaponName === weaponName)

        if (!weapon) {
            throw new Error(`Weapon not found: ${weaponName}`)
        }
        return weapon
    }
}

const weaponCollection = (): Weapon[] => {
    return [
        ...assaultRifles(),
        ...smgs(),
        ...lmgs(),
        ...sniperRifles(),
        ...shotguns(),
        ...pistols(),
        ...crossbows()
    ]
}

function assaultRifles(): Weapon[] {
    return [
        new Weapon(
            "Gallant",
            WeaponClassEnum.AssaultRifle,
            BarrelAttachmentTypeEnum.Energy,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Burst 3", new Projectile(21, 900, new Burst(3, 0.25))),
                new FireMode("Burst 5", new Projectile(21, 900, new Burst(5, 0.35)))
            ]
        ),
        new Weapon(
            "Karna",
            WeaponClassEnum.AssaultRifle,
            BarrelAttachmentTypeEnum.Energy,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(17.5, 600)),
                new FireMode("Single", new Projectile(17.5, 350)),
                new FireMode("Charge Single", new ProjectileCharged(105, 350, 2))
            ]
        ),
        new Weapon(
            "Killshot",
            WeaponClassEnum.AssaultRifle,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new ProjectileAlternate(22, 19, 535)),
            ]
        ),
        new Weapon(
            "P4-AR",
            WeaponClassEnum.AssaultRifle,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(12, 810)),
            ]
        ),
        new Weapon(
            "P8-AR",
            WeaponClassEnum.AssaultRifle,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(45, 235)),
            ]
        ),
        new Weapon(
            "Parallax",
            WeaponClassEnum.AssaultRifle,
            null,
            2,
            new Crafting(1.26, null),
            [
                new FireMode("Full Auto", new Volt(
                    new ProjectileHeat(13, 600, 3.5, 1.35),
                    new Beam(210, 17.85),
                    4.2, //overheat cooldown
                    40, //heat threshold
                    1, //heat dmg mod
                    1, //heat gen mod
                    [{ x: -100, y: 0.4 }, { x: 140, y: 1.7 }]
                )
                ),
            ]
        ),
        new Weapon(
            "S71",
            WeaponClassEnum.AssaultRifle,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(21.5, 500)),
            ]
        ),
    ]
}

function smgs(): Weapon[] {
    return [
        new Weapon(
            "C54",
            WeaponClassEnum.SMG,
            BarrelAttachmentTypeEnum.Ballistic,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(11.5, 925)),
            ]
        ),
        new Weapon(
            "Custodian",
            WeaponClassEnum.SMG,
            BarrelAttachmentTypeEnum.Energy,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(13, 800)),
                new FireMode("Burst 3", new Projectile(13, 900, new Burst(3, 0.6))),
                new FireMode("Charged Burst", new ProjectileCharged(15.6, 1200, 3, new Burst(11, 0.3)))
            ]
        ),
        new Weapon(
            "Lumin V",
            WeaponClassEnum.SMG,
            BarrelAttachmentTypeEnum.Energy,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Burst 3", new Projectile(21, 700, new Burst(3, 0.15))),
            ]
        ),
        new Weapon(
            "P8-SC",
            WeaponClassEnum.SMG,
            BarrelAttachmentTypeEnum.Ballistic,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(13.75, 800)),
                new FireMode("Burst 3", new Projectile(13.75, 850, new Burst(3, 0.3))),
            ]
        ),
        new Weapon(
            "Quartz",
            WeaponClassEnum.SMG,
            null,
            1,
            new Crafting(1.2, null),
            [
                new FireMode("Beam", new Volt(
                    new Beam(225, 50),
                    null,
                    0.867,
                    100,
                    1,
                    1,
                    [{ x: -100, y: 0 }, { x: 140, y: 2 }]
                )
                )
            ]
        ),
        new Weapon(
            "Ripper",
            WeaponClassEnum.SMG,
            null,
            1,
            new Crafting(1.075, null),
            [
                new FireMode("Beam", new Beam(165))
            ]
        ),
    ]
}

function lmgs(): Weapon[] {
    return [
        new Weapon(
            "Demeco",
            WeaponClassEnum.LMG,
            BarrelAttachmentTypeEnum.Energy,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(11.5, 800))
            ]
        ),
        new Weapon(
            "F55",
            WeaponClassEnum.LMG,
            null,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(10, 1200)),
            ]
        ),
        new Weapon(
            "Fresnel",
            WeaponClassEnum.LMG,
            null,
            2,
            new Crafting(1.2, null),
            [
                new FireMode("Full Auto", new Volt(
                    new ProjectileHeat(9, 550, 1.975, 0.2),
                    null,
                    8,
                    100,
                    6,
                    0.5,
                    [{ x: -100, y: 0.1 }, { x: 140, y: 2 }]
                )),
            ]
        ),
        new Weapon(
            "FS-9",
            WeaponClassEnum.LMG,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(14.5, 650)),
            ]
        ),
        new Weapon(
            "Pulverizer",
            WeaponClassEnum.LMG,
            null,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(27, 355)),
            ]
        ),
    ]
}

function sniperRifles(): Weapon[] {
    return [
        new Weapon(
            "A03",
            WeaponClassEnum.SniperRifle,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.20, null),
            [
                new FireMode("Single", new Projectile(42.5, 225)),
            ]
        ),
        new Weapon(
            "Arrowhead",
            WeaponClassEnum.SniperRifle,
            BarrelAttachmentTypeEnum.Energy,
            2,
            new Crafting(1.20, null),
            [
                new FireMode("Single", new Projectile(50, 70)),
                new FireMode("Charged Single", new ProjectileCharged(75, 70, 0.5)),
            ]
        ),
        new Weapon(
            "Atzkav",
            WeaponClassEnum.SniperRifle,
            null,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new ProjectileElectron(120, 30, 0.65, 0.75)),
            ]
        ),
        new Weapon(
            "P6-LR",
            WeaponClassEnum.SniperRifle,
            BarrelAttachmentTypeEnum.Ballistic,
            2,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(100, 55)),
            ]
        ),
        new Weapon(
            "Scalpel",
            WeaponClassEnum.SniperRifle,
            null,
            2,
            new Crafting(1.20, null),
            [
                new FireMode("Double", new Projectile(90, 50)),
                new FireMode("Single", new Projectile(45, 60)),
            ]
        ),
        new Weapon(
            "Zenith",
            WeaponClassEnum.SniperRifle,
            null,
            2,
            new Crafting(1.20, null),
            [
                new FireMode("First charged + Single", new Volt(
                    new FireSequence([
                        new FireEvent(new ProjectileHeatCharged(85, 325, 19.125, 1, 3.5), 1),
                        new FireEvent(new ProjectileHeat(42.5, 325, 19.125, 1))
                    ]),
                    null,
                    2.218,
                    100,
                    1,
                    1,
                    [{ x: -100, y: -0.5 }, { x: 140, y: 1.35 }]
                )),
                new FireMode("Single", new Volt(
                    new FireSequence([
                        new FireEvent(new ProjectileHeat(42.5, 325, 19.125, 1))
                    ]),
                    null,
                    2.218,
                    100,
                    1,
                    1,
                    [{ x: -100, y: -0.5 }, { x: 140, y: 1.35 }]
                )),
                new FireMode("Charged Single", new Volt(
                    new FireSequence([
                        new FireEvent(new ProjectileHeatCharged(85, 325, 19.125, 1, 3.5))
                    ]),
                    null,
                    2.218,
                    100,
                    1,
                    1,
                    [{ x: -100, y: -0.5 }, { x: 140, y: 1.35 }]
                ))
            ]
        ),
    ]
}

function shotguns(): Weapon[] {
    return [
        new Weapon(
            "BR-2",
            WeaponClassEnum.Shotgun,
            BarrelAttachmentTypeEnum.Ballistic,
            3,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(88, 90)),
            ]
        ),
        new Weapon(
            "Deadrig",
            WeaponClassEnum.Shotgun,
            null,
            3,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(144, 50)),
            ]
        ),
        new Weapon(
            "Devastator",
            WeaponClassEnum.Shotgun,
            BarrelAttachmentTypeEnum.Energy,
            3,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(120, 60)),
                new FireMode("Charged Single", new ProjectileCharged(150, 60, 2.5)),
            ]
        ),
        new Weapon(
            "Prism",
            WeaponClassEnum.Shotgun,
            null,
            3,
            new Crafting(1.2, null),
            [
                new FireMode("Single", new Volt(
                    new ProjectileHeat(46, 385, 8.5, 1),
                    new ProjectileHeat(50, 200, 10, 1), //slug projectile
                    4.2,
                    40,
                    1,
                    1,
                    [{ x: -100, y: 0.2 }, { x: 140, y: 2 }]
                )),
            ]
        ),
        new Weapon(
            "R97",
            WeaponClassEnum.Shotgun,
            null,
            3,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(28.8, 375)),
                new FireMode("Single", new Projectile(48, 150)),
            ]
        ),
        new Weapon(
            "Ravager-212 Twin",
            WeaponClassEnum.Shotgun,
            null,
            3,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(28.8, 375)),
                new FireMode("Single", new Projectile(48, 150)),
            ]
        ),
    ]
}

function pistols(): Weapon[] {
    return [
        new Weapon(
            "Arclight",
            WeaponClassEnum.Pistol,
            BarrelAttachmentTypeEnum.Energy,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Burst 3", new Projectile(18, 700, new Burst(3, 0.1))),
                new FireMode("Single", new Projectile(18, 500)),
            ]
        ),
        new Weapon(
            "Coda",
            WeaponClassEnum.Pistol,
            BarrelAttachmentTypeEnum.Ballistic,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(60, 180)),
            ]
        ),
        new Weapon(
            "LH86",
            WeaponClassEnum.Pistol,
            BarrelAttachmentTypeEnum.Ballistic,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Full Auto", new Projectile(13, 950)),
            ]
        ),
        new Weapon(
            "Pulse",
            WeaponClassEnum.Pistol,
            null,
            1,
            new Crafting(1.16, null),
            [
                new FireMode("Full Auto", new Volt(
                    new ProjectileHeat(11.75, 550, 3.4, 2),
                    null,
                    1.2,
                    100,
                    1,
                    1,
                    [{ x: -100, y: 0 }, { x: 140, y: 2 }]
                )),
            ]
        ),
        new Weapon(
            "S-38",
            WeaponClassEnum.Pistol,
            BarrelAttachmentTypeEnum.Ballistic,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(22.5, 450)),
            ]
        ),
        new Weapon(
            "Salvo Frag",
            WeaponClassEnum.Pistol,
            null,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(45, 170)),
                new FireMode("Charged Single", new ProjectileCharged(90, 729, 1)),
            ]
        ),
        new Weapon(
            "Tripledown",
            WeaponClassEnum.Pistol,
            null,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new Projectile(108, 60)),
            ]
        ),
        new Weapon(
            "Yubarev",
            WeaponClassEnum.Pistol,
            null,
            1,
            new Crafting(1.075, 1.12),
            [
                new FireMode("Single", new ProjectileElectron(32.5, 350, 0.5, 0.75)),
            ]
        ),
    ]
}

function crossbows(): Weapon[] {
    return [
        new Weapon(
            "Novia",
            WeaponClassEnum.Crossbow,
            null,
            0,
            new Crafting(1.2, null),
            [
                new FireMode("Single", new Projectile(150, 42))
            ]
        )
    ]
}
