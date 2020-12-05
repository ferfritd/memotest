import React, {useContext, useEffect, useState, useMemo} from 'react'
import {useParams} from 'react-router-dom'

import {DeckContext} from '../../shared/Context/DeckContextProvider'

import addDeckToCollection from '../../shared/util/addDeckToCollection'

export default function DeckShared() {

    const {onSetCollection} = useContext(DeckContext)

    const sharedDeck = decodeURIComponent(useParams().deck)

    let failed = false


        try{
            var sharedDeckCollection = useMemo(()=>{
                return addDeckToCollection(JSON.parse(sharedDeck))    
            },[sharedDeck])
            
        } catch(error){
            failed = true
        }

    const [deck, setDeck] = useState(sharedDeckCollection || null)
    
    useEffect(() => {
        if(deck){
            onSetCollection(deck)
        }
    }, [])



    return (
        <div>
            {failed ? <h1>We couldn't create the new deck</h1> : <h1>Deck created successfully</h1>}
        </div>    
    )
}
