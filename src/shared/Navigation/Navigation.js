import React from 'react'

import {NavLink} from 'react-router-dom'

import './Navigation.css'

export default function Navigation() {
    return (
        <nav>
            <ul className="navigation">
                <li>
                    <NavLink to="/"exact>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/game" exact>
                        New Game
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
