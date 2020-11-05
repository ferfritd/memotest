import React, {useContext, useState} from 'react'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {DeckContext} from '../../shared/Context/DeckContextProvider' 

import Button from '../../shared/UI/Button'

export default function MyGames() {

    const history = useHistory()

    const {collection, onCreateDeck, onsetTitle} = useContext(DeckContext)

    const [deckState, setstate] = useState(null)

    const playGameHandler = (id) => {


        const selectedDeck = collection.filter( deck => {
            return deck.id === id
        })

        setstate(selectedDeck[0])
    }

    useEffect(()=>{         
        if(deckState){
            localStorage.setItem('currentDeck', JSON.stringify(deckState))
            onCreateDeck(deckState.deck)
            onsetTitle(deckState.title)
            history.push('/')
        }
    },[deckState])

    const myGames = 
        collection.length > 0 ?
        <ul>
            {collection.reverse().map(deck => {
                return (<div key={deck.id}>
                            <li>
                                <p>
                                    {deck.title} - {deck.timeStamp}
                                </p>
                                <ul>
                                    {deck.deck.map((pair, i) => {
                                        return(
                                            <li key={i}>
                                                <p>{`${pair[0]} - ${pair[1]} `}</p>
                                            </li>
                                        ) 
                                        
                                    })}
                                </ul>
                            </li>
                            <Button type="button" click={() => playGameHandler(deck.id)}>Play</Button>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                       </div>)
                        
            })}
        </ul> 
        : <p>No games yet!</p>


    return (
        <div>
            {myGames}
        </div>
    )
}
