import React, {useContext, useState} from 'react'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {DeckContext} from '../../shared/Context/DeckContextProvider' 
import useDidMountEffect from '../../shared/hooks/useDidMountEffect';

import Button from '../../shared/UI/Button'

export default function MyGames() {

    const history = useHistory()

    const {collection, deckState, onCreateDeck, onsetTitle, onSetCollection} = useContext(DeckContext)

    const [deck, setstate] = useState(deckState)
    const [collectionState, setCollectionState] = useState(collection)

    const playGameHandler = (id) => {
        const selectedDeck = collectionState.filter( deck => {
            return deck.id === id
        })

        setstate(selectedDeck[0])
        localStorage.setItem('currentDeck', JSON.stringify(selectedDeck[0]))
    }

    const deleteDeckHandler = (id) => {
        const selectedDecks = collectionState.filter( deck => {
            return deck.id !== id
        })

        const removedDeck = collectionState.filter( deck => {
            return deck.id === id
        })

        localStorage.setItem('deckCollection', JSON.stringify(selectedDecks))
        console.log(removedDeck, deck)
        if(removedDeck.id === deck.id){
        localStorage.setItem('currentDeck', JSON.stringify([]))
        }
        setCollectionState(selectedDecks)
    }

    useDidMountEffect(()=>{         
        onCreateDeck(deck.deck)
        onsetTitle(deck.title)
        history.push('/')
        
    },[deck])

    useDidMountEffect(() => {
        onSetCollection(collectionState)
        onCreateDeck([['Perro', 'Dog'], ['Gato', 'Cat']])
        onsetTitle("My Game")
    },[collectionState])

    const myGames = 
        collectionState.length > 0 ?
        <ul>
            {collectionState.reverse().map(deck => {
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
                            <Button click={() => deleteDeckHandler(deck.id)}>Delete</Button>
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
