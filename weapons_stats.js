const weaponsStats = {
    "Assault Rifle": {
        "Gallant": {
            "Burst 3": {
                "alpha": 21,
                "fire_rate": 900,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 108,
                "barrel_size": 2,
                "type": "energy",
                "burst_size": 3,
                "burst_cooldown": 0.25
            },
            "Burst 5": {
                "alpha": 21,
                "fire_rate": 825,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 99,
                "barrel_size": 2,
                "type": "energy",
                "burst_size": 5,
                "burst_cooldown": 0.35
            }
        },
        "Karna": {
            "Full Auto": {
                "alpha": 17.5,
                "fire_rate": 600,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 72,
                "barrel_size": 2,
                "type": "energy"
            },
            "Single": {
                "alpha": 17.5,
                "fire_rate": 350,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 42,
                "barrel_size": 2,
                "type": "energy"
            },
            "Charged Single": {
                "alpha": 105,
                "fire_rate": 350,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 42,
                "charge_time": 2,
                "barrel_size": 2,
                "type": "energy"
            }
        },
        "Killshot": {
            "Combined": {
                "alpha": 22,
                "fire_rate": 535,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 64.2,
                "barrel_size": 2,
                "type": "physical"
            }
        },
        "P4-AR": {
            "Full Auto": {
                "alpha": 12,
                "fire_rate": 810,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 97.2,
                "barrel_size": 2,
                "type": "physical"
            }
        },
        "P8-AR": {
            "Single": {
                "alpha": 45,
                "fire_rate": 235,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 28.2,
                "barrel_size": 2,
                "type": "physical"
            }
        },
        "S71": {
            "Single": {
                "alpha": 21.5,
                "fire_rate": 500,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 60,
                "barrel_size": 2,
                "type": "physical"
            }
        }
    },
    "LMG": {
        "Demeco": {
            "Full Auto": {
                "alpha": 11.5,
                "fire_rate": 800,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 96,
                "barrel_size": 2,
                "type": "energy"
            }
        },
        "F55": {
            "Full Auto": {
                "alpha": 10,
                "fire_rate": 1200,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 144,
                "barrel_size": 0,
                "type": "physical"
            }
        },
        "FS-9": {
            "Full Auto": {
                "alpha": 14.5,
                "fire_rate": 650,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 78,
                "barrel_size": 2,
                "type": "physical"
            }
        },
        "Pulverizer": {
            "Full Auto": {
                "alpha": 27,
                "fire_rate": 650,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 42.6,
                "barrel_size": 0,
                "type": "physical"
            }
        }
    },
    "SMG": {
        "C54": {
            "Full Auto": {
                "alpha": 11.5,
                "fire_rate": 925,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 111,
                "barrel_size": 1,
                "type": "physical"
            }
        },
        "Custodian": {
            "Full Auto": {
                "alpha": 13,
                "fire_rate": 800,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 96,
                "barrel_size": 1,
                "type": "energy"
            },
            "Burst 3": {
                "alpha": 13,
                "fire_rate": 800,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 96,
                "barrel_size": 1,
                "type": "energy",
                "burst_size": 3,
                "burst_cooldown": 0.6
            },
            "Charged Burst": {
                "alpha": 13,
                "fire_rate": 800,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 96,
                "barrel_size": 1,
                "type": "energy",
                "charge_time": 3,
                "burst_size": 11,
                "burst_cooldown": 0.85
            }
        },
        "Lumin V": {
            "Burst 3": {
                "alpha": 21,
                "fire_rate": 700,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 84,
                "barrel_size": 1,
                "type": "energy",
                "burst_size": 3,
                "burst_cooldown": 0.15
            }
        },
        "P8-SC": {
            "Full Auto": {
                "alpha": 13.75,
                "fire_rate": 800,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 96,
                "barrel_size": 1,
                "type": "physical"
            },
            "Burst 3": {
                "alpha": 13.75,
                "fire_rate": 850,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 102,
                "barrel_size": 1,
                "type": "physical",
                "burst_size": 3,
                "burst_cooldown": 0.15
            }
        }
    },
    "Sniper Rifle": {
        "A03": {
            "Single": {
                "alpha": 42.5,
                "fire_rate": 225,
                "craft_max_dmg_mod": 20,
                "craft_max_rate_delta": 0,
                "barrel_size": 2,
                "type": "physical"
            }
        },
        "Arrowhead": {
            "Single": {
                "alpha": 50,
                "fire_rate": 70,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 8.4,
                "barrel_size": 2,
                "type": "energy"
            },
            "Charged Single": {
                "alpha": 42.5,
                "fire_rate": 75,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 8.4,
                "barrel_size": 2,
                "type": "energy",
                "charge_time": 0.5
            }
        },
        "Atzkav": {
            "Single": {
                "alpha": 120,
                "fire_rate": 30,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 3.6,
                "barrel_size": 0,
                "type": "electron"
            }
        },
        "P6-LR": {
            "Single": {
                "alpha": 100,
                "fire_rate": 55,
                "craft_max_dmg_mod": 20,
                "craft_max_rate_delta": 0,
                "barrel_size": 2,
                "type": "physical"
            }
        },
        "Scalpel": {
            "Double": {
                "alpha": 90,
                "fire_rate": 50,
                "craft_max_dmg_mod": 20,
                "craft_max_rate_delta": 0,
                "barrel_size": 0,
                "type": "physical"
            },
            "Single": {
                "alpha": 45,
                "fire_rate": 60,
                "craft_max_dmg_mod": 20,
                "craft_max_rate_delta": 0,
                "barrel_size": 0,
                "type": "physical"
            }
        },
        "Zenith": {
            "Single": {
                "alpha": 42.5,
                "fire_rate": 325,
                "craft_max_dmg_mod": 20,
                "craft_max_rate_delta": 0,
                "barrel_size": 0,
                "type": "electron"
            },
            "Charged Single": {
                "alpha": 85,
                "fire_rate": 325,
                "craft_max_dmg_mod": 20,
                "craft_max_rate_delta": 0,
                "barrel_size": 0,
                "type": "electron",
                "charge_time": 3.5
            }
        }
    },
    "Shotgun": {
        "BR-2": {
            "Single": {
                "alpha": 88,
                "fire_rate": 90,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 10.8,
                "barrel_size": 3,
                "type": "physical"
            }
        },
        "Deadrig": {
            "Single": {
                "alpha": 144,
                "fire_rate": 50,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 6,
                "barrel_size": 0,
                "type": "physical"
            }
        },
        "Devastator": {
            "Single": {
                "alpha": 120,
                "fire_rate": 60,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 7.2,
                "barrel_size": 3,
                "type": "energy"
            },
            "Charged Single": {
                "alpha": 150,
                "fire_rate": 60,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 7.2,
                "barrel_size": 3,
                "type": "energy",
                "charge_time": 2.5
            }
        },
        "R97": {
            "Full Auto": {
                "alpha": 28.8,
                "fire_rate": 375,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 45,
                "barrel_size": 0,
                "type": "physical"
            },
            "Single": {
                "alpha": 48,
                "fire_rate": 150,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 18,
                "barrel_size": 0,
                "type": "physical"
            }
        },
        "Ravager-212 Twin": {
            "Single": {
                "alpha": 52,
                "fire_rate": 350,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 42,
                "barrel_size": 0,
                "type": "physical"
            }
        }
    },
    "Pistol": {
        "Arclight": {
            "Burst 3": {
                "alpha": 18,
                "fire_rate": 700,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 84,
                "barrel_size": 1,
                "type": "energy",
                "burst_size": 3,
                "burst_cooldown": 0.1
            },
            "Single": {
                "alpha": 18,
                "fire_rate": 500,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 60,
                "barrel_size": 1,
                "type": "energy"
            }
        },
        "Coda": {
            "Single": {
                "alpha": 60,
                "fire_rate": 180,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 21.6,
                "barrel_size": 1,
                "type": "physical"
            }
        },
        "LH86": {
            "Full Auto": {
                "alpha": 13,
                "fire_rate": 950,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 114,
                "barrel_size": 1,
                "type": "physical"
            }
        },
        "S-38": {
            "Single": {
                "alpha": 22.5,
                "fire_rate": 450,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 54,
                "barrel_size": 1,
                "type": "physical"
            }
        },
        "Salvo Frag": {
            "Single": {
                "alpha": 45,
                "fire_rate": 170,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 20.4,
                "barrel_size": 0,
                "type": "physical"
            },
            "Charged Single": {
                "alpha": 90,
                "fire_rate": 420,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 86.4,
                "barrel_size": 0,
                "type": "physical",
                "charge_time": 1
            }
        },
        "Tripledown": {
            "Single": {
                "alpha": 108,
                "fire_rate": 60,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 7.2,
                "barrel_size": 0,
                "type": "physical"
            }
        },
        "Yubarev": {
            "Single": {
                "alpha": 32.5,
                "fire_rate": 350,
                "craft_max_dmg_mod": 7.5,
                "craft_max_rate_delta": 42,
                "barrel_size": 0,
                "type": "electron"
            }
        }
    }
}