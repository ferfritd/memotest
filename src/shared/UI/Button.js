import React from 'react'
import { Link } from "react-router-dom";

import './Button.css'

export default function Button(props) {

    if (props.to) {
        return (
          <Link
            to={props.to}
            exact={props.exact}
            className={props.classes}
          >
            {props.children}
          </Link>
        );
    }

    return (

            <button type={props.type} className={props.classes} onClick={props.click}>{props.children}</button>
        
    )
}
