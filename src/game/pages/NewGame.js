import React, { useReducer, useEffect, useContext } from 'react'
import { v4 as uuidV4 } from "uuid";

import {DeckContext} from '../../shared/Context/DeckContextProvider'

import Input from '../Components/input'
import Button from "../../shared/UI/Button";

import "./NewGame.css";

const formReducer = (state, action) => {
    
    let newState = {...state}
    switch(action.type){
        case 'INPUTCHANGE':
            newState.inputs.forEach(pair => {
                let firstId = pair.id.concat('-firstInput')
                let secondId = pair.id.concat('-secondInput')
                if(firstId === action.id){
                    pair.pairs[0] = action.value
                }
                if(secondId === action.id){
                    pair.pairs[1] = action.value
                }
            });
            return newState
        case 'SUBMITFORM':
            const finalDeck = []
            newState.inputs.forEach(pair => {
                if(pair.pairs[0] && pair.pairs[1]){
                    finalDeck.push(pair.pairs)
                }
                pair.pairs = ['', '']

            })
            newState.deck = finalDeck
            
            return newState
        default:
            return newState
    }
}

export default function NewGame() {

    const {onCreateDeck} = useContext(DeckContext)


    const [state, dispatch] = useReducer(formReducer, 
        {
            inputs:[
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']},
            ],
            deck: []
            
        })
    

    const inputChangeHandler = (id, value) => {
        dispatch({type:'INPUTCHANGE', id:id, value:value})
    }

    const submitFormHandler = e => {
        e.preventDefault()
        dispatch({type:'SUBMITFORM'}) 
    }

    const inputArray = state.inputs.map((el) => {
        return (<div key={el.id} id={el.id} className="inputs-field">
        <Input type="text" id={`${el.id}-firstInput`} value={el.pairs[0]} onInput={inputChangeHandler}/>
        <Input type="text" value={el.pairs[1]} id={`${el.id}-secondInput`} onInput={inputChangeHandler}/>
        </div>)
        })

        useEffect(() => {
            if(state.deck.length > 0){
                onCreateDeck(state.deck)
            }
        }, [state.deck])

    return (
        <main className="centered">
            <form onSubmit={submitFormHandler}>
                {inputArray}
                <div className="button-container">
                <Button type="submit" classes="button button-main">Create deck</Button>
                </div>
            </form>
        </main>
    )
}
