import React, { useEffect, useReducer, useContext } from 'react';

import { DeckContext } from "../../shared/Context/DeckContextProvider";

import Card from '../../shared/UI/Card'
import Modal from '../../shared/UI/Modal'
import Button from "../../shared/UI/Button";

import './Game.css'

const sortCards = () => {
    return Math.random() - .5
}

const restartGame = state => {
    state.remainingPairs = state.cards.length
    state.selectedCard = null
    state.turn = 0

    state.gameLogic.forEach(card => {
        card.isTurned = false
        
    })
}

const resetState = state => {
    restartGame(state)

    state.gameLogic.sort(sortCards)
    return state       
}

const reducer = (state, action) => {

    const newState = {...state}

    switch(action.type){
        case 'RESTARTGAME':

            restartGame(newState)

            return newState
        
        case 'SORTCARDS':
          
            newState.gameLogic.sort(sortCards)
                
            return newState      
            
        case 'TURNTOFRONT':

            newState.gameLogic[action.id].isTurned = true
            
            if(state.turn === 0){
                newState.selectedCard = newState.gameLogic[action.id]
                newState.turn = 1
            }
            if(state.turn === 1){
                newState.turn = 2
            }
            return newState

        case 'CHECKMATCH':
                        
            if(newState.gameLogic[action.id].pair === newState.selectedCard){

                newState.remainingPairs = newState.remainingPairs - 1

            } else {
                newState.gameLogic[action.id].isTurned = false
                newState.selectedCard.isTurned = false
            }

            newState.selectedCard = {}
            newState.turn = 0
            return newState
        case 'RESETSTATE':
            resetState(newState)
            break
        default:
            return state

    }
};


export default function Game(props) {

    const {deckState, gameTitle} = useContext(DeckContext)
    
    const gameLogic = deckState.map(pair => {

        const firstWord = {value:pair[0], isTurned:false}
        const secondWord = {value:pair[1], isTurned:false}
        
        firstWord.pair = secondWord
        secondWord.pair = firstWord
        
        return [firstWord, secondWord] 
    }
)
.flat().sort(sortCards);


    const [state, dispatch] = useReducer(reducer, 
        {
            cards: deckState,
            remainingPairs: deckState.length,
            gameLogic: gameLogic,
            selectedCard: {},
            turn: 0
        }, resetState
        )

    const restartGameHandler = () => {
        setTimeout(() => {
            dispatch({type:'SORTCARDS'})
        },1000)

        dispatch({type:'RESTARTGAME'})
             
      }

    const clickHandler = (id) => {
        if(state.turn === 1)
        
            setTimeout(() => {
                dispatch({type:'CHECKMATCH', id:id})
            }, 1000);
        dispatch({type:'TURNTOFRONT', id:id})
    }
            
    const deck = state.gameLogic.map((card, i) => {
        return <Card turn={state.turn} key={i} clicked={() => {clickHandler(i)}} info={card} />
    })

    useEffect(() => {

        return () => {
            dispatch({type:'RESETSTATE'})
        }  
        
    }, [])


    return (
        <main>
            
        <div className= "game-table centered">
            {state.remainingPairs === 0 ? <Modal active restartGameHandler={restartGameHandler}/> : <Modal active={false}/>}
            
            <h1>{gameTitle}</h1>
            <div className="grid">
                {deck}
            </div>
        </div>
        <div className="centered button-container">
            <Button classes="button button-main" click={restartGameHandler}>Restart</Button>      
        </div>
        </main>
    )
}
