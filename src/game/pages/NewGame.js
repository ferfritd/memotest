import React, { useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import { DeckContext } from '../../shared/Context/DeckContextProvider'
import useForm from '../../shared/hooks/useForm'

import Input from '../Components/input'
import Button from "../../shared/UI/Button";

import "./GameForm.css";


export default function NewGame() {

    const history = useHistory()

    const {onCreateDeck, onsetTitle, onSetCollection} = useContext(DeckContext)

    const [state,{inputChangeHandler, addInputHandler, removeInputHandler, changeTitleHandler, submitFormHandler}] = useForm('', [])

    const inputArray = state.inputs.map((el) => {
        return (<div key={el.id} id={el.id} className="inputs-field">
        <p className="remove-input" onClick={()=>removeInputHandler(el.id)}>Remove</p>
        <Input type="text" id={`${el.id}-firstInput`} value={el.pairs[0]} onInput={inputChangeHandler}/>
        <p className="dash">-</p>
        <Input type="text" value={el.pairs[1]} id={`${el.id}-secondInput`} onInput={inputChangeHandler}/>
        </div>)
        })

        useEffect(() => {

            if(state.deck.length > 0 && state.title.length > 0){
                onCreateDeck(state.deck)
                onsetTitle(state.title)

                const date = new Date().toLocaleDateString()
                const time = new Date().toLocaleTimeString()
                
                const deck = {id:uuidV4(), title:state.title, deck:state.deck, timeStamp:`Created on ${date} at ${time}`}
                let deckCollection = JSON.parse(localStorage.getItem
                ('deckCollection'))


                if(!deckCollection){
                    localStorage.setItem('deckCollection', JSON.stringify([deck]))
                    deckCollection = JSON.parse(localStorage.getItem
                        ('deckCollection')) 
                } else {
                    deckCollection.unshift({...deck})
                    localStorage.setItem('deckCollection', JSON.stringify(deckCollection))
                }

                onSetCollection(deckCollection)

                localStorage.setItem('currentDeck',JSON.stringify(deck))
                history.push('/')
            }
        }, [state.deck])

    return (
        <main className="centered">
            <h1  style={{textAlign:"center", marginBottom:"4rem"}}>Create New Deck</h1>
            <form className="box deck-form" onSubmit={submitFormHandler}>
                <Input id="deckName" placeholder="Insert deck's name" onInput={changeTitleHandler}/>
                {inputArray}
                <Button type="button" classes="button button-main" click={addInputHandler}>New Pair</Button>
                <div className="button-container">
                <Button type="submit" classes="button button-main">Create deck</Button>
                </div>
            </form>
        </main>
    )
}
