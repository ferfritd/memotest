import React, {useContext} from 'react'

import {DeckContext} from '../../shared/Context/DeckContextProvider' 

export default function MyGames() {

    const {collection} = useContext(DeckContext)

    const myGames = 
        collection.length > 0 ?
        <ul>
            {collection.reverse().map(deck => {
                return <li key={deck.id}>
                            <p>
                                {deck.title}
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
            })}
        </ul> 
        : <p>No games yet!</p>


    return (
        <div>
            {myGames}
        </div>
    )
}
