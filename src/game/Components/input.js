import React, { Fragment } from 'react'



export default function Input({element, type, onInput, id, value}) {

    const inputChangeHandler = (e) => {
        const value = e.target.value
        onInput(id, value)
    }

    const HTMLInput = element === 'textarea' ? <textarea/> : <input type={type} value={value} onChange={inputChangeHandler}/>

    
    return (
        <Fragment>
            {HTMLInput}
        </Fragment>    
        
    )
}
