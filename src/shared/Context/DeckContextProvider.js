import React, {createContext, useState} from 'react'

export const DeckContext = createContext()

export default function DeckContextProvider(props) {

    const [deckState, setDeckState] = useState([['perro', 'dog'],['gato', 'cat']])

    const createDeckHandler = deck => {
      setDeckState(deck)
    }


    return (
      <DeckContext.Provider value={{deckState, onCreateDeck:(deck) => createDeckHandler(deck)}}>
        {props.children}
      </DeckContext.Provider>
    )
}
