import React, { useReducer, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import {DeckContext} from '../../shared/Context/DeckContextProvider'

import Input from '../Components/input'
import Button from "../../shared/UI/Button";

import "./NewGame.css";

const formReducer = (state, action) => {
    
    let newState = {...state}
    switch(action.type){
        case 'CHANGETITLE':
            newState.title = action.value
            return newState
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
        case "ADDINPUT":
            newState.inputs.push({id:uuidV4(), pairs:['','']})
            return newState
        case 'SUBMITFORM':
            const finalDeck = []
            newState.inputs.forEach(pair => {
                if(pair.pairs[0] && pair.pairs[1]){
                    finalDeck.push(pair.pairs)
                }

            })
            newState.deck = finalDeck
            
            return newState
        default:
            return newState
    }
}

export default function NewGame() {

    const history = useHistory()

    const {onCreateDeck, onsetTitle, onSetCollection} = useContext(DeckContext)


    const [state, dispatch] = useReducer(formReducer, 
        {
            inputs:[
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']},
                {id:uuidV4(),pairs:['', '']},
            ],
            title: '',
            deck: []
            
        })

    const changeTitleHandler = (id, value) => {
        dispatch({type:'CHANGETITLE', value:value})
    }
    

    const inputChangeHandler = (id, value) => {
        dispatch({type:'INPUTCHANGE', id:id, value:value})
    }

    const addInputHandler = () => {
        dispatch({type:"ADDINPUT"})
    } 

    const submitFormHandler = e => {
        e.preventDefault()
        dispatch({type:'SUBMITFORM'}) 
    }

    const inputArray = state.inputs.map((el) => {
        return (<div key={el.id} id={el.id} className="inputs-field">
        <Input type="text" id={`${el.id}-firstInput`} value={el.pairs[0]} onInput={inputChangeHandler}/>
        <p className="dash">-</p>
        <Input type="text" value={el.pairs[1]} id={`${el.id}-secondInput`} onInput={inputChangeHandler}/>
        </div>)
        })

        useEffect(() => {
            if(state.deck.length > 0 && state.title.length > 0){
                onCreateDeck(state.deck)
                onsetTitle(state.title)


                const deck = {id:uuidV4(), title:state.title, deck:state.deck}
                let deckCollection = JSON.parse(localStorage.getItem
                ('deckCollection'))


                if(!deckCollection){
                    localStorage.setItem('deckCollection', JSON.stringify([deck]))
                    deckCollection = JSON.parse(localStorage.getItem
                        ('deckCollection')) 
                } else {
                    deckCollection.push({...deck})
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
