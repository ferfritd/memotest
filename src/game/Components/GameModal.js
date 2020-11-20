import React, {useState, useEffect} from 'react'

import Modal from '../../shared/UI/Modal'

export default function GameModal({restartGameHandler, extraStyles, closeModalHandler}) {

    return (
        <Modal
            extraStyles={extraStyles}
            onAccept={restartGameHandler}
            acceptText='Play Again'
            onCancel={closeModalHandler}
            cancelText='Return to game' 
            transition={'slow-transition'}>
                <p>Congrats, you win! You're awesome!</p>
        </Modal>
    )
}
