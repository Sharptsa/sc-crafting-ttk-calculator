const darkModeSwitch = document.getElementById("darkModeSwitch")

const getStoredTheme = () => localStorage.getItem('theme')
const setStoredTheme = theme => localStorage.setItem('theme', theme)

const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
        return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = theme => {
    if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
}

const showActiveTheme = (theme) => {
    if (theme === 'dark' && !darkModeSwitch.checked) {
        darkModeSwitch.click()
    }
}

const toggleDarkMode = (e) => {
    if (darkModeSwitch.checked) {
        setTheme('dark')
        setStoredTheme('dark')
    } else {
        setTheme('light')
        setStoredTheme('light')
    }
}

export const init = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        const preferredTheme = getPreferredTheme()
        setStoredTheme(preferredTheme)
        setTheme(preferredTheme)
        showActiveTheme(preferredTheme)
    })

    darkModeSwitch.addEventListener('click', () => toggleDarkMode())
}

