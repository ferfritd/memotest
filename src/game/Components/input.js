import React, { Fragment } from 'react'



export default function Input({element, type, placeholder, onInput, id, value, classes}) {

    const inputChangeHandler = (e) => {
        const value = e.target.value
        onInput(id, value)
    }

    const HTMLInput = element === 'textarea' ? <textarea className={classes} value={value} onChange={inputChangeHandler} placeholder={placeholder}/> : <input className={classes} type={type} value={value} onChange={inputChangeHandler} placeholder={placeholder}/>

    
    return (
        <Fragment>
            {HTMLInput}
        </Fragment>    
        
    )
}
