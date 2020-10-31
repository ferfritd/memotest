import React from 'react'

import './Button.css'

export default function Button(props) {
    return (
            <button type={props.type} className={props.classes} onClick={props.click}>{props.children}</button>
        
    )
}
