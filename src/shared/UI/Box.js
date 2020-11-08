import React from 'react'

import './Box.css'

export default function Box(props) {
    return (
        <div className={`box ${props.extraClasses || ""}`}>
            {props.children}
        </div>
    )
}
