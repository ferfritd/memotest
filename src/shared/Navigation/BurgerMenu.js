import React from 'react'

import './BurgerMenu.css'

export default function BurgerMenu({openSideDrawerHandler}) {
    return (
        <div onClick={openSideDrawerHandler} className='burger-menu'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
