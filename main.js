import * as DarkMode from "./modules/dark_mode.mjs"
import * as WeaponSelector from "./modules/weapon_selector.mjs"
import * as Calculator from "./modules/calculator.mjs"


DarkMode.init()
WeaponSelector.init()

const autoModeCheckbox = document.getElementById("autoTTK")
const btnCalculate = document.getElementById("btnCalculateTTK")

btnCalculate.addEventListener('click', () => {
    Calculator.calculateTTK(WeaponSelector.selected_weapon)
})

autoModeCheckbox.addEventListener('change', (event) => {
    btnCalculate.disabled = event.target.checked
    if (event.target.checked) {
        Calculator.calculateTTK(WeaponSelector.selected_weapon)
    }
})

WeaponSelector.weaponEventDispatcher.addEventListener("weaponUpdated", (event) => {
    if (autoModeCheckbox.checked) {
        Calculator.calculateTTK(WeaponSelector.selected_weapon)
    }
})


