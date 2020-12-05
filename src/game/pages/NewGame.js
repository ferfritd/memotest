import React, { useEffect, useContext, useState, Fragment } from 'react'
import { useHistory } from "react-router-dom";

import { DeckContext } from '../../shared/Context/DeckContextProvider'

import useForm from '../../shared/hooks/useForm'
import useScroll from '../../shared/hooks/useScroll'
import addDeckToCollection from '../../shared/util/addDeckToCollection'

import Input from '../Components/input'
import Button from "../../shared/UI/Button"
import Box from "../../shared/UI/Box"
import Modal from '../../shared/UI/Modal'

import "./GameForm.css";


export default function NewGame(props) {

    document.title = props.title

    const history = useHistory()

    const {onCreateDeck, onsetTitle, onSetCollection} = useContext(DeckContext)

    const [state,{inputChangeHandler, addInputHandler, removeInputHandler, changeTitleHandler, submitFormHandler}] = useForm('', [])

    const [showModal, setShowModal] = useState(false)

    let dontShow = JSON.parse(localStorage.getItem('dontShowNewGameModalAnymore'))

    if(!dontShow){
        localStorage.setItem('dontShowNewGameModalAnymore', JSON.stringify({dontShowAnymore: false}))
        dontShow = {dontShowAnymore: false}
    }

    const [dontShowAnymore, setDontShowAnymore] = useState(dontShow.dontShowAnymore)

    const dontShowModalHandler = (e) => {
        e.preventDefault()
        localStorage.setItem('dontShowNewGameModalAnymore', JSON.stringify({dontShowAnymore:dontShowAnymore}))  
        setShowModal(false)

    }

    const [scrollPosition] = useScroll(0)

    const inputArray = state.inputs.map((el, id) => {
        return (<div key={el.id} id={el.id} className="inputs-field">
        <p className="remove-input" onClick={()=>removeInputHandler(el.id)}>Remove</p>
        <p className="input-number">{`${id + 1}`}</p>
        <div className="pair-input">
            <Input classes={el.showError ? 'input-error' : ''} type="text" id={`${el.id}-firstInput`} value={el.pairs[0]} onInput={inputChangeHandler} showError={el.showError} errorMessage='Looks like you forgot to fill this one'/>
        </div>
        <p className="dash">-</p>
        <div className="pair-input">
            <Input classes={el.showError ? 'input-error' : ''} type="text" value={el.pairs[1]} id={`${el.id}-secondInput`} onInput={inputChangeHandler} showError={el.showError} errorMessage='Looks like you forgot to fill this one'/>
        </div>
        </div>)
        })

        useEffect(() => {
            setShowModal(true)
        }, [])

        useEffect(() => {

            if(state.deck.length > 0 && state.title.length > 0){
                onCreateDeck(state.deck)
                onsetTitle(state.title)

                const deckCollection = addDeckToCollection(state)
                
                onSetCollection(deckCollection)
                
                history.push('/')
            }
            if(state.title.length === 0){
                window.scrollTo(0,0)
            }
        }, [state.deck])

    return (
        <Fragment>
            {(showModal && !dontShow.dontShowAnymore) ?
                
                    <Modal extraStyles={{top:`calc(50% + ${scrollPosition}px)`}} classes="instructions-modal" transition='slow-transition'>
                        <h2 className='modal-header'>Ready to create a new Deck?</h2>
                        <p className='form-instructions'>Let us just tell how this form works</p>
                        <ul className='form-intructions-list'>
                            <li>
                                <p className='form-instructions'>You can create as many cards as you want (we don't suggest to create so many of them. Remember you can create all the decks you want)</p>
                            </li>
                            <li>
                                <p className='form-instructions'>Empty fields (where the 2 inputs are empty) will not be processed. You don't have to worry about deleting them</p>
                            </li>
                            <li>
                                <p className='form-instructions'> Sometimes you may forget filling a field. We will warn you, so you won't miss any of the words you want to learn</p>
                            </li>
                        </ul>
                        <form onSubmit={dontShowModalHandler}>
                            <div className='closeModalButton'>

                            <Button type='submit' classes={'button button-main'}>GOT IT</Button>
                            </div>
                            <label id="newGameDontShowLabel">
                            <input onChange={() => setDontShowAnymore(!dontShowAnymore)} id="newGameDontShow" type='checkbox'/>
                                Don't show me this message anymore
                            </label>
                        </form>
                    </Modal>

                :
                <Modal classes="instructions-modal" extraStyles={{top:`calc(-150%)`}} transition='slow-transition'>
                <h2 className='modal-header'>Ready to create a new Deck?</h2>
                    <p className='form-instructions'>Let us just tell how this form works</p>
                    <ul>
                        <li>
                            <p className='form-instructions'>You can create as many cards as you want (we don't suggest to create so many of them. Remember you can create all the decks you want)</p>
                        </li>
                        <li>
                            <p className='form-instructions'>Empty fields (where the 2 inputs are empty) will not be processed. You don't have to worry about deleting them</p>
                        </li>
                        <li>
                            <p className='form-instructions'> Sometimes you may forget filling a field. We will warn you, so you won't miss any of the words you want to learn</p>
                        </li>
                    </ul>
                    <form onSubmit={dontShowModalHandler}>
                        <div className='closeModalButton'> 

                        <Button disabled={true} type='submit' classes={'button button-main'}>GOT IT</Button>
                        </div>
                        <label id="newGameDontShowLabel">
                        <input onChange={() => setDontShowAnymore(!dontShowAnymore)} id="newGameDontShow" type='checkbox'/>
                            Don't show me this message anymore
                        </label>
                    </form>
                    
                </Modal>
            }
            <div className="centered">
                <h1  style={{textAlign:"center", marginBottom:"4rem"}}>Create New Deck</h1>
                <Box>
                    <form className="deck-form" onSubmit={submitFormHandler}>
                        <Input classes="title-input" id="deckName" placeholder="Insert deck's name" onInput={changeTitleHandler} showError={true} errorMessage="Don't forget to fill this field"/>
                        {inputArray}
                        <div className="add-buttons">
                            <Button type="button" classes="button button-main button-small button-circle" click={() => addInputHandler(1)}>+1</Button>
                            <Button type="button" classes="button button-inverted button-small button-circle" click={() => addInputHandler(4)}>+4</Button>
                        </div>
                        <div className="button-container">
                            <Button type="submit" classes="button button-main">Create deck</Button>
                        </div>
                    </form>
                </Box>
            </div>
        </Fragment>
    )
}
