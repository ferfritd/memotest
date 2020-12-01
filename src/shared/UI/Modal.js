import React from 'react'
import { createPortal } from 'react-dom'

import Button from './Button'

import './Modal.css'

export default function Modal({onAccept, acceptText, onCancel, cancelText, children, classes, transition, extraStyles}) {

    const modal = <div style={extraStyles} className={` modal ${classes || ''} ${transition || ''}`}>
                    <div>
                        {children}
                        <div className="modal-buttons">
                            {acceptText &&                                  <Button classes={'button button-main'} click={onAccept}>{acceptText}</Button>
                            }
                            {cancelText &&
                            <Button classes={'button button-inverted'} click={onCancel}>{cancelText}</Button>
                            }
                        </div>
                    </div>
                 </div>

    return createPortal(modal, document.getElementById('modal-hook'))
}
