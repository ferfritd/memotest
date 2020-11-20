import React from 'react'

import Modal from '../../shared/UI/Modal'

export default function DeleteGameModal({classes, openCloseModalHandler, deleteDeckHandler, transition, extraStyles, deckName}) {
    
    return (
        <Modal 
            classes={classes}
            extraStyles={extraStyles}
            onAccept={deleteDeckHandler}
            acceptText='YES'
            onCancel={openCloseModalHandler}
            cancelText='NO'
            transition={transition}>
                 <p>Are you sure that you want to delete "{deckName}"?</p>
        </Modal>
    )
}
