import React, {useState} from 'react'

import Logo from '../UI/Logo'
import Navigation from './Navigation'
import BurgerMenu from './BurgerMenu'
import SideDrawer from './SideDrawer'
import Backdrop from '../UI/Backdrop'

import './Header.css'

export default function Header(props) {

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const openSideDrawerHandler = () => {
        setShowSideDrawer(true)
    }

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false)
    }

    return (
        <header className="header">
            {showSideDrawer
             && <Backdrop OnCloseBackdrop={closeSideDrawerHandler}/>}
             {showSideDrawer &&
             <SideDrawer>
                 <p className='close-sideDrawer' onClick={closeSideDrawerHandler}>close</p>
                 <Navigation closeSideDrawerHandler={closeSideDrawerHandler} showNavClass='sideDrawerNav'/>
            </SideDrawer>
             }
            <Logo className="logo"/>
            <BurgerMenu openSideDrawerHandler={openSideDrawerHandler}/>
            <Navigation showNavClass='barNav'/>
        </header>

    )
}
