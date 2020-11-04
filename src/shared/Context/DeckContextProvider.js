import React, {createContext, useState} from 'react'

export const DeckContext = createContext()

export default function DeckContextProvider(props) {

     const myDeck = localStorage.getItem('currentDeck')

     if(myDeck){
       var {deck, title} = JSON.parse(myDeck);
     }

    const [deckState, setDeckState] = useState(deck || [['perro', 'dog'],['gato', 'cat']])
    const [deckTitle, setDeckTitle] = useState(title ||"My game")

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
