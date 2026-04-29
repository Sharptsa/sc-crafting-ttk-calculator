<script setup lang="ts">
import { BNavbar, BNavbarBrand, BNavbarToggle, BNavForm, BNavbarNav, BNavItemDropdown, BCollapse, BDropdownItem } from 'bootstrap-vue-next';
import DarkModeSwitch from './DarkModeSwitch.vue';
</script>

<template>
    <BNavbar container="xl" variant="secondary-subtle" toggleable="sm">
        <BNavbarToggle target="navbar-toggle-collapse">
            <span class="navbar-toggler-icon"></span>
        </BNavbarToggle>
        <BCollapse id="navbar-toggle-collapse" is-nav>
            <BNavbarBrand href="#navbar-toggle">
                <img class="d-inline-block align-text-top" src="/public/sharp-logo.png" width="30" height="30"
                    alt="logo">
                SC Weapon TTK calculator
            </BNavbarBrand>
            <BNavbarNav class="me-auto">
                <BNavItemDropdown text="Tools ⚙️" right>
                    <BDropdownItem>
                        📋 <a
                            href="https://docs.google.com/spreadsheets/d/1BD87issjyxeOLYAV5V6vafawD2TGuaftnfXPAyIo_2w/edit?gid=869785434#gid=869785434"
                            target="_blank" rel="noopener noreferrer">SC FPS Data 4.7 stats table</a>
                    </BDropdownItem>
                    <BDropdownItem>
                        🔨 <a
                            href="https://sc-craft.tools/?category=Weapons+%2F+LMG&category=Weapons+%2F+Pistol&category=Weapons+%2F+Rifle&category=Weapons+%2F+Shotgun&category=Weapons+%2F+SMG&category=Weapons+%2F+Sniper"
                            target="_blank" rel="noopener noreferrer">sc-craft.tools</a>
                    </BDropdownItem>
                </BNavItemDropdown>
            </BNavbarNav>
        </BCollapse>
        <BNavForm class="d-flex">
            <DarkModeSwitch />
        </BNavForm>
    </BNavbar>
</template>

<style scoped lang="scss">
:deep(.navbar-brand) {
    font-size: 1.5rem;
}

:deep(.nav-item) {
    font-size: 1.1rem;
}
</style>
