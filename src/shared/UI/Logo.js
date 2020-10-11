import React from 'react'
import {Link} from 'react-router-dom'

import logo from '../../assets/images/logo.png'

export default function Logo(props) {
    return (
        <div className={props.className}>
            <Link to="/">
            <img src={logo} alt="logo"/>
            </Link>
        </div>
    )
}
