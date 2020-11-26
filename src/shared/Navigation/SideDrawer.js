import React from 'react'
import { createPortal } from 'react-dom'


import './SideDrawer.css'

export default function SideDrawer(props) {

    return createPortal(
        <aside className='sideDrawer'>
            {props.children}
        </aside>, document.getElementById('sideDrawer-hook')
    )
}
