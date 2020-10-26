import React, {useState} from 'react'
import { createPortal } from 'react-dom'

import './Modal.css'

export default function Modal({active, restartGameHandler}) {
    
    const content = 
    <div className={`modal ${!active ? 'modal-closed': 'modal-active'}`}>
        <div>
        <h2>Congrats, you win! You're awesome!</h2>
        </div>
        <div className="buttons">
            <button onClick={restartGameHandler}>Play Again</button>
        </div>
    </div>

    return createPortal(content, document.getElementById('modal-hook'))
}
