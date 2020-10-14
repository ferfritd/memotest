import React, { useReducer } from 'react';

import Card from '../../shared/UI/Card'

import './Game.css'

const wordsArray = [['dog', 'perro'], ['cat', 'gato']]

const gameLogic = wordsArray.map(pair => {

        const firstWord = {value:pair[0], isTurned:false}
        const secondWord = {value:pair[1], isTurned:false}
        
        firstWord.pair = secondWord
        secondWord.pair = firstWord
        
        return [firstWord, secondWord] 
    }
)
.flat()
.sort(() => {return Math.random() - 0.5})

const reducer = (state, action) => {

    switch(action.type){
        case 'TURNTOFRONT':
            if(state.turn === 0){
                const newState = {...state}
                newState.gameLogic[action.id].isTurned = true
                newState.selectedCard = newState.gameLogic[action.id]
                newState.turn = 1
                return newState
            }

            
                const newState = {...state}
                newState.gameLogic[action.id].isTurned = true
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

    const clickHandler = (id) => {
        dispatch({type:'TURNTOFRONT', id:id})
    }
    
        const deck = gameLogic.map((card, i) => {
            return <Card key={i} clicked={() => {clickHandler(i)}} info={card} />
        })
    

    return (
        <div>
            {state.remainingPairs === 0 ? <p>Ganaste!</p> : ''}
            <div className="grid">
            {deck}
            </div>
            
        </div>
    )
}
