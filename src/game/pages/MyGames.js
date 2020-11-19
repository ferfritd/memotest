import React, {useContext, useState} from 'react'
import { useHistory } from "react-router-dom";

import { DeckContext } from '../../shared/Context/DeckContextProvider' 
import useDidMountEffect from '../../shared/hooks/useDidMountEffect';

import Button from '../../shared/UI/Button'
import Box from '../../shared/UI/Box'

import './MyGames.css'

export default function MyGames(props) {

    document.title = props.title

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
        <div className="game-container">
            {collectionState.map(deck => {
                return (
                    <div className="info-card" key={deck.id}>
                        <h2>
                            {deck.title}
                        </h2>
                        <p>
                            {deck.timeStamp}
                        </p>
                        <div className="game-info" >
                            {deck.deck.map((pair, i) => {
                                return(
                                    
                                    <p key={i}>
                                        {`${pair[0]} - ${pair[1]} `}
                                    </p>
                                    
                                ) 
                                
                            })}
                        </div>
                        <div className="buttons">
                            <Button classes="button button-small button-main" type="button" click={() => playGameHandler(deck.id)}>Play</Button>
                            <Button to={`/my-games/${deck.id}`} exact={"true"} classes="button button-small button-inverted">
                                Edit
                            </Button>
                            <Button classes="button button-small button-main" click={() => deleteDeckHandler(deck.id)}>Delete</Button>
                        </div>
                            
                    </div>)
                        
            })}
        </div> 
        : <div className="new-game-section">    
            <h2 style={{fontSize:'4rem', color: '#3f6854'}}>No games yet! Why don't you try creating a new one?</h2>
            
            <Button to='/game' exact={"true"} classes="button button-main">
                New Deck
            </Button>
    
          </div>


    return (
        <React.Fragment>
            <h1 style={{textAlign:"center"}}>
                MY GAMES
            </h1>
            <Box>
                {myGames}
            </Box>
        </React.Fragment>
    )
}
