import React from 'react'

import Modal from '../../shared/UI/Modal'

export default function DeleteGameModal({classes, openCloseModalHandler, deleteDeckHandler, transition, extraStyles}) {
    
    return (
        <Modal 
            classes={classes}
            extraStyles={extraStyles}
            onAccept={deleteDeckHandler}
            acceptText='YES'
            onCancel={openCloseModalHandler}
            cancelText='NO'
            transition={transition}>
                 <p>Are you sure you want to delete this deck?</p>
        </Modal>
    )
}
