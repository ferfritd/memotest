import React, {useContext, useEffect, useState, useMemo} from 'react'
import {useParams, useHistory} from 'react-router-dom'


import {DeckContext} from '../../shared/Context/DeckContextProvider'

import addDeckToCollection from '../../shared/util/addDeckToCollection'

import Box from '../../shared/UI/Box'
import Button from '../../shared/UI/Button'

export default function DeckShared() {

    const history = useHistory()

    const {onSetCollection, onCreateDeck, onsetTitle} = useContext(DeckContext)

    const sharedDeck = decodeURIComponent(useParams().deck)

    let failed = false


        try{
            var sharedDeckCollection = useMemo(()=>{
                return addDeckToCollection(JSON.parse(sharedDeck))    
            },[sharedDeck])
            
        } catch(error){
            failed = true
        }

    const [deckCollection, setDeckColletion] = useState(sharedDeckCollection || null)
    const [deck, setDeck] = useState(sharedDeckCollection[0] || null)

    const playGameHandler = () => {
        localStorage.setItem('currentDeck', JSON.stringify(deck))
        onCreateDeck(deck.deck)
        onsetTitle(deck.title)
        history.replace('/')
    }
    
    useEffect(() => {
        if(deckCollection){
            onSetCollection(deckCollection)
        }
    }, [])



    return (
        <Box>
            {failed ? <h1>We couldn't create the new deck</h1> : <h1>Deck created successfully</h1>}
            {!failed && <Button classes='button button-inverted' click={playGameHandler}>Play</Button>}
            <Button classes='button-link button-main' to='/my-games'>See my decks</Button>
        </Box>    
    )
}
