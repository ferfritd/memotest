import React, { useEffect, useReducer } from 'react';

import Card from '../../shared/UI/Card'
import Modal from '../../shared/UI/Modal'

import './Game.css'

const wordsArray = [['dog', 'perro'], ['cat', 'gato']]

const sortCards = () => {
    return Math.random() - .5
}


const gameLogic = wordsArray.map(pair => {

        const firstWord = {value:pair[0], isTurned:false}
        const secondWord = {value:pair[1], isTurned:false}
        
        firstWord.pair = secondWord
        secondWord.pair = firstWord
        
        return [firstWord, secondWord] 
    }
)
.flat().sort(sortCards)


const reducer = (state, action) => {

    const newState = {...state}

    switch(action.type){
        case 'RESTARTGAME':

            newState.remainingPairs = newState.cards.length
            newState.selectedCard = null
            newState.turn = 0

            newState.gameLogic.forEach(card => {
                card.isTurned = false
                
            })
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
            
        default:
            return state

    }
};


export default function Game() {

    const [state, dispatch] = useReducer(reducer, 
        {
            cards: wordsArray,
            remainingPairs: wordsArray.length,
            gameLogic: gameLogic,
            selectedCard: {},
            turn: 0
        }
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
            
    const deck = gameLogic.map((card, i) => {
        return <Card turn={state.turn} key={i} clicked={() => {clickHandler(i)}} info={card} />
    })

    useEffect(() => {

        restartGameHandler()

        // Variante para emular "ComponentWillUnmount"
        // return () => {
        //     restartGameHandler()
        // }  
        
    }, [])


    return (
        <div>
            {state.remainingPairs === 0 ? <Modal active restartGameHandler={restartGameHandler}/> : <Modal active={false}/>}
            <div className="grid">
            {deck}
            <button onClick={restartGameHandler}>Restart</button>
            </div>
            
        </div>
    )
}
