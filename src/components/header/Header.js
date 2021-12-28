import React, { useEffect, useState } from 'react';
import { ThemeSwitch } from '../themeswitch/ThemeSwitch';
import logo from '../../assets/ipwire-logo.svg';
import './header.scss';

export const Header = () => {

    const [scroll, setScroll] = useState(true)

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY < 50
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    })

    return (
        <div className={scroll ? 'app-header' : 'app-header app-header-small'}>
            <nav className='app-navigation'>
                <ThemeSwitch></ThemeSwitch>
                <div onClick={() => window.scrollTo(0, 0)} className={'app-logo'}>
                    <img src={logo} alt="ipwire logo" />
                </div>
            </nav>
            <h1 className="header-title">{scroll ? 'Track any IP and discover useful information.' : ''}</h1>
        </div>
    )
}
