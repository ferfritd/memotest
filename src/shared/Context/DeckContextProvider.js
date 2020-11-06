import React, {createContext, useState} from 'react'

export const DeckContext = createContext()

export default function DeckContextProvider(props) {

     const currentDeck = localStorage.getItem('currentDeck')
     const deckCollection = localStorage.getItem('deckCollection')

     if(currentDeck){
       var {title, deck} = JSON.parse(currentDeck);
       var myCollection = JSON.parse(deckCollection)
     }

    const defaultGame = [['perro', 'dog'],['gato', 'cat']]
    const defaultTitle = "My game"

    const [deckState, setDeckState] = useState(deck || defaultGame)
    const [deckTitle, setDeckTitle] = useState(title || defaultTitle)
    const [collectionState, setCollectionState] = useState(myCollection || [])

    const createDeckHandler = deck => {
      setDeckState(deck)
    }


    return (
      <DeckContext.Provider value={
        {deckState,
         gameTitle:deckTitle,
         collection:collectionState,
         onCreateDeck:(deck) => createDeckHandler(deck),
         onsetTitle:(title)=> setDeckTitle(title),
         onSetCollection:(collection) => setCollectionState(collection)}}
         >
        {props.children}
      </DeckContext.Provider>
    )
}
