import React from 'react'

import Logo from '../UI/Logo'
import Navigation from './Navigation'
import './Header.css'

export default function Header(props) {
    return (
        <header className="header">
            <Logo className="logo"/>
            <Navigation/>
        </header>

    )
}
