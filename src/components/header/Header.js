import React, {useEffect, useState} from 'react';
import { ThemeSwitch } from '../themeswitch/ThemeSwitch';
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
            <ThemeSwitch></ThemeSwitch>
            <div className={'header-bg'}></div>
            <div className={'header-overlay'}></div>
            <div className={'app-logo'}>
                <i className={'eva eva-globe-outline logo-icon'}></i>
                <p>IP TrackTool</p>
            </div>
            <h1 className="header-title">{scroll ? 'Track any IP and discover essential information.' : ''}</h1>
        </div>
    )
}
