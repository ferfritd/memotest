import React, { useReducer } from 'react'

import Card from '../../shared/UI/Card'

const wordsArray = [['Lauris', 'Campeona'], ['Auris', 'loMás']]

const gameLogic = wordsArray.map(pair => {

        const firstWord = {value:pair[0], isTurned:false}
        const secondWord = {value:pair[1], isTurned:false}
        
        firstWord.pair = secondWord
        secondWord.pair = firstWord
        
    return [firstWord, secondWord] 
}).flat().sort(() => {return Math.random() - 0.5})

const reducer = (state, action) => {

    switch(action.type){
        case 'TURNTOFRONT':
            const newState = {...state}
            newState.gameLogic[action.id].isTurned = true 
            return newState
        default:
            return state

    }
};

export default function Game() {
    

            const [state, dispatch] = useReducer(reducer, 
                {
                    cards: wordsArray,
                    remainingPairs: 2,
                    gameLogic: gameLogic,
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
            {deck}    
        </div>
    )
}
