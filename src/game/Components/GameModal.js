import React, {useState, useEffect} from 'react'

import Modal from '../../shared/UI/Modal'

export default function GameModal({active, restartGameHandler}) {

    const [returnToGame, setReturnToGame] = useState(false)
    
    const returnToGameHandler = () => {
        setReturnToGame(true)
    }

    useEffect(() => {
        if(returnToGame && !active){
            setReturnToGame(false)
        }
    }, [returnToGame, active])

    return (
        <Modal 
            classes={`${!active || returnToGame ? 'modal-goes-to-up': 'modal-enters-from-up'}`}
            onAccept={restartGameHandler}
            acceptText='Play Again'
            onCancel={returnToGameHandler}
            cancelText='Return to game' 
            transition={'slow-transition'}>
                <h2>Congrats, you win! You're awesome!</h2>
        </Modal>
    )
}
