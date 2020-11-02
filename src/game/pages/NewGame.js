import React, { useReducer } from 'react'
import { v4 as uuidV4 } from "uuid";
import Input from '../Components/input'
import Button from "../../shared/UI/Button";

import "./NewGame.css";

const formReducer = (state, action) => {
    let newState = {...state}
    switch(action.type){
        case 'INPUTCHANGE':
            newState.deck.forEach(pair => {
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
            newState.deck.forEach(pair => {
                finalDeck.push(pair.pairs)
                pair.pairs = ['', '']
            })
            console.log(finalDeck)
            return newState
        default:
            return newState
    }
}

export default function NewGame() {


    const [state, dispatch] = useReducer(formReducer, 
        {
            deck:[
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']}
            ]
            
        })
    

    const inputChangeHandler = (id, value) => {
        dispatch({type:'INPUTCHANGE', id:id, value:value})
    }

    const submitFormHandler = e => {
        e.preventDefault()
        dispatch({type:'SUBMITFORM'}) 
    }

    const inputArray = state.deck.map((el) => {
        return (<div key={el.id} id={el.id} className="inputs-field">
        <Input type="text" id={`${el.id}-firstInput`} value={el.pairs[0]} onInput={inputChangeHandler}/>
        <Input type="text" value={el.pairs[1]} id={`${el.id}-secondInput`} onInput={inputChangeHandler}/>
    
        </div>)
        })

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
