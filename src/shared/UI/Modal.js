import React, {useState, useEffect} from 'react'
import { createPortal } from 'react-dom'

import Button from './Button'

import './Modal.css'

export default function Modal({active, restartGameHandler}) {

    const [returnToGame, setReturnToGame] = useState(false)
    
    const returnToGameHandler = () => {
        setReturnToGame(true)
    }

    useEffect(() => {
        if(returnToGame && !active){
            setReturnToGame(false)
        }
    }, [returnToGame, active])

    const content = 
    <div className={`modal ${!active || returnToGame ? 'modal-closed': 'modal-active'}`}>
        <div>
            <h2>Congrats, you win! You're awesome!</h2>
            <div className="modal-buttons">
                <Button classes={'button button-main'} click={restartGameHandler}>Play Again</Button>
                <Button classes={'button button-inverted'} click={returnToGameHandler}>Return to Game</Button>
            </div>
        </div>
    </div>

    return createPortal(content, document.getElementById('modal-hook'))
}
