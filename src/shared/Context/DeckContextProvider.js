import React, {createContext, useState} from 'react'

export const DeckContext = createContext()

export default function DeckContextProvider(props) {

    const [deckState, setDeckState] = useState([['perro', 'dog'],['gato', 'cat']])
    const [deckTitle, setDeckTitle] = useState("My game")

    const createDeckHandler = deck => {
      setDeckState(deck)
    }


    return (
      <DeckContext.Provider value={
        {deckState,
         gameTitle:deckTitle, 
         onCreateDeck:(deck) => createDeckHandler(deck),
         onsetTitle:(title)=> setDeckTitle(title)}}>
        {props.children}
      </DeckContext.Provider>
    )
}
