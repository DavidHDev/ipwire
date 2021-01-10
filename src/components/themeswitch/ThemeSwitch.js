import './themeswitch.scss';
import React from 'react'
import { Switch } from "@chakra-ui/react"
import useDarkMode from 'use-dark-mode';

export const ThemeSwitch = () => {

    const darkMode = useDarkMode(false);

    return (
        <div className="app-theme-switcher">
            {
                darkMode.value === true 
                ? <i className="eva eva-moon-outline theme-icon"></i>
                : <i className="eva eva-sun-outline theme-icon"></i>
            }
            <p className="theme-switch-text">Dark Mode</p>
            <Switch isChecked={darkMode.value} onChange={darkMode.toggle} className="app-switch" colorScheme="cyan" size="lg" />
        </div>
    )
}
