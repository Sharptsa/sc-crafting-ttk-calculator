<script setup lang="ts">
import DarkModeSwitch from './DarkModeSwitch.vue';
</script>

<template>
    <div class="max-lg:collapse bg-base-200">
        <input id="navbar-1-toggle" class="peer hidden" type="checkbox" />
        <label for="navbar-1-toggle" class="fixed inset-0 hidden max-lg:peer-checked:block"></label>
        <div class="navbar shadow-sm min-h-0 h-12 lg:min-h-auto lg:h-auto">
            <div class="container mx-auto max-w-480 lg:px-4 flex">
                <div class="lg:navbar-start flex grow gap-2 items-center pb-1">
                    <label for="navbar-1-toggle" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <img class="h-5 w-5 xl:h-6 xl:w-6" src="/public/sharp-logo.png" alt="logo" />
                    <h1 class="text-lg xl:text-xl font-semibold">SC Weapon TTK Calculator</h1>
                </div>
                <div class="hidden lg:navbar-center lg:flex">
                    <ul class="menu menu-horizontal px-0">
                        <li>
                            <a href="https://docs.google.com/spreadsheets/d/1BD87issjyxeOLYAV5V6vafawD2TGuaftnfXPAyIo_2w/edit?gid=869785434#gid=869785434"
                                target="_blank" rel="noopener noreferrer">
                                📋 SC FPS Data 4.7
                            </a>
                        </li>
                        <li>
                            <a href="https://sc-craft.tools/" target="_blank" rel="noopener noreferrer">
                                🔨 SC Craft Tools
                            </a>
                        </li>
                        <li>
                            <a href="https://zylox.dev/speedcalc/" target="_blank" rel="noopener noreferrer">
                                🏃‍➡️ Weight/Speed calculator
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="lg:navbar-end flex shrink">
                    <DarkModeSwitch />
                </div>
            </div>
        </div>
        <div class="collapse-content p-0 lg:hidden z-1">
            <ul class="menu">
                <li>
                    <a href="https://docs.google.com/spreadsheets/d/1BD87issjyxeOLYAV5V6vafawD2TGuaftnfXPAyIo_2w/edit?gid=869785434#gid=869785434"
                        target="_blank" rel="noopener noreferrer">
                        📋 SC FPS Data 4.7
                    </a>
                </li>
                <li>
                    <a href="https://sc-craft.tools/" target="_blank" rel="noopener noreferrer">
                        🔨 SC Craft Tools
                    </a>
                </li>
                <li>
                    <a href="https://zylox.dev/speedcalc/" target="_blank" rel="noopener noreferrer">
                        🏃‍➡️ Weight/Speed calculator
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
