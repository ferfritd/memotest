import React, { useState, useEffect, useReducer, useContext } from 'react';

import { DeckContext } from "../../shared/Context/DeckContextProvider";

import Card from '../../shared/UI/Card'
import GameModal from '../Components/GameModal'
import Button from "../../shared/UI/Button";
import Box from '../../shared/UI/Box'

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

                if(newState.remainingPairs === 0){
                    newState.modalIsOpen = true
                }

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
        case 'CLOSEMODAL':
            newState.modalIsOpen = false
            return newState
        default:
            return state

    }
};


export default function Game(props) {

    document.title = props.title


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
            turn: 0,
            modalIsOpen: false
        }, resetState
        )
    
    const [scrollPosition, setScrollPosition] = useState(0)

    const scrollHandler = () => {
         const position = window.pageYOffset;
         setScrollPosition(position)
    }

    const restartGameHandler = () => {
        setTimeout(() => {
            dispatch({type:'SORTCARDS'})
        },1000)

        dispatch({type:'CLOSEMODAL'})
        dispatch({type:'RESTARTGAME'})
             
      }

    const clickHandler = (id) => {
        if(state.turn === 1)
        
            setTimeout(() => {
                dispatch({type:'CHECKMATCH', id:id})
            }, 1000);
        dispatch({type:'TURNTOFRONT', id:id})
    }

    const closeModalHandler = () => {
        dispatch({type:'CLOSEMODAL'})
    }
            
    const deck = state.gameLogic.map((card, i) => {
        return <Card turn={state.turn} key={i} clicked={() => {clickHandler(i)}} info={card} />
    })

    useEffect(() => {

        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
            dispatch({type:'RESETSTATE'})
        }  
        
    }, [])
    
    return (
        <React.Fragment>    
            <Box extraClasses= "centered">
                {state.modalIsOpen ? <GameModal active restartGameHandler={restartGameHandler} closeModalHandler={closeModalHandler} extraStyles={{top:`calc(50% + ${scrollPosition}px)`}}/> : <GameModal extraStyles={{top:'-50%'}}/>}
                
                <h1>{gameTitle}</h1>
                <div className="grid">
                    {deck}
                </div>
            </Box>
            <div className="centered button-container">
                <Button classes="button button-main" click={restartGameHandler}>Restart</Button>      
            </div>
        </React.Fragment>
    )
}
