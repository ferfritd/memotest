import React from 'react'
import {createPortal} from 'react-dom'

import './Backdrop.css'

export default function Backdrop({OnCloseBackdrop}) {

    const backdrop = <div onClick={OnCloseBackdrop} className='backdrop-open'>

                     </div>

    return createPortal(backdrop, document.getElementById('backdrop-hook'))
    
}
