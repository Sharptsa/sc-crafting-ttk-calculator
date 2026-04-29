import { defineStore } from 'pinia'

import { Weapon } from '@/models/Weapon';
import type FireMode from '@/models/FireMode';

export const useWeaponsStore = defineStore('weapons', {
    state: () => {
        return {
            selectedWeapon: null as Weapon | null,
            selectedWeaponMode: null as FireMode | null
        }
    },
    getters: {
        customDmgModifier: (state): number => {
            return state.selectedWeapon?.customDmgMod ?? 1
        },
        customFireRateModifier: (state): number => {
            return  state.selectedWeapon?.customFireRateMod ?? 1
        }
    }
})
