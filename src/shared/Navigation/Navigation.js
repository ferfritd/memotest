import React from 'react'

import {NavLink} from 'react-router-dom'

import './Navigation.css'

export default function Navigation({showNavClass, closeSideDrawerHandler}) {
    return (
        <nav className={showNavClass}>
            <ul className="navigation">
                <li>
                    <NavLink to="/"exact onClick={closeSideDrawerHandler} >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="/game" exact onClick={closeSideDrawerHandler}>
                        New Game
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-games" exact onClick={closeSideDrawerHandler} >
                        My Games
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
