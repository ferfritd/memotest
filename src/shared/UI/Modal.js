import React from 'react'
import { createPortal } from 'react-dom'

import Button from './Button'

import './Modal.css'

export default function Modal({onAccept, acceptText, onCancel, cancelText, children, classes, transition}) {

    const modal = <div className={` modal ${classes || ''} ${transition || ''}`}>
                    <div>
                        {children}
                        <div className="modal-buttons">
                            <Button classes={'button button-main'} click={onAccept}>{acceptText}</Button>
                            <Button classes={'button button-inverted'} click={onCancel}>{cancelText}</Button>
                        </div>
                    </div>
                 </div>

    return createPortal(modal, document.getElementById('modal-hook'))
}
