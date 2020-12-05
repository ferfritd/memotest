import React, {useContext, useState, useEffect, Fragment } from 'react'
import { useHistory } from "react-router-dom";

import { DeckContext } from '../../shared/Context/DeckContextProvider' 

import useDidMountEffect from '../../shared/hooks/useDidMountEffect'
import useScroll from '../../shared/hooks/useScroll'

import Button from '../../shared/UI/Button'
import Box from '../../shared/UI/Box'
import DeleteGameModal from '../Components/DeleteGameModal'
import Backdrop from '../../shared/UI/Backdrop'
import Modal from '../../shared/UI/Modal';


import './MyGames.css'

export default function MyGames(props) {

    document.title = props.title

    const history = useHistory()

    const {collection, deckState, onCreateDeck, onsetTitle, onSetCollection} = useContext(DeckContext)

    const [deck, setstate] = useState(deckState)
    const [collectionState, setCollectionState] = useState(collection)
    const [showModal, setShowModal] = useState(false)
    const [deckToRemove, setDeckToRemove] = useState(null)
    const [deckToShare, setDeckToShare] = useState(null)
    
    const [scrollPosition, scrollHandler] = useScroll(0)

    const playGameHandler = (id) => {
        const selectedDeck = collectionState.filter( deck => {
            return deck.id === id
        })

        setstate(selectedDeck[0])
        localStorage.setItem('currentDeck', JSON.stringify(selectedDeck[0]))
    }

    const openCloseModalHandler = (id) => {

        if(deckToShare){
            setDeckToShare(null)
        } else {
            const removedDeck = collectionState.filter( deck => {
                return deck.id === id
            })
            setDeckToRemove(...removedDeck)
        }
        setShowModal(!showModal)
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

    const shareDeckHandler = (id) => {
        const selectedDeck = collectionState.filter( deck => {
            return deck.id === id
        })

        setDeckToShare(selectedDeck[0])
        setShowModal(true)

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
        setShowModal(false)
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
                            <Button to={`/my-games/${deck.id}`} exact={"true"} classes="button button-small button-inverted button-link">
                                Edit
                            </Button>
                            <Button classes="button button-small button-main" click={() => openCloseModalHandler(deck.id)}>Delete</Button>
                            <Button classes="button button-small button-inverted" type="button" click={() => shareDeckHandler(deck.id)}>Share</Button>
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
        <Fragment>
            {showModal 
                ?
                !deckToShare
                ?
                <Fragment>
                    <Backdrop OnCloseBackdrop={openCloseModalHandler}/>
                    <DeleteGameModal
                        deckName={deckToRemove.title}
                        openCloseModalHandler={openCloseModalHandler} deleteDeckHandler={() =>deleteDeckHandler(deckToRemove.id)}  
                        extraStyles={{top:`calc(50% + ${scrollPosition}px)`}}
                    /> 
                </Fragment>
                :
                <Fragment>
                    <Backdrop OnCloseBackdrop={openCloseModalHandler}/>
                    <Modal acceptText='OK' extraStyles={{top:`calc(50% + ${scrollPosition}px)`}} onAccept={openCloseModalHandler}> 
                        {`localhost:3000/shared/${encodeURIComponent(JSON.stringify(deckToShare))}`}
                    </Modal>
                </Fragment>
                :
                ''
            }
                
            <h1 style={{textAlign:"center"}}>
                MY GAMES
            </h1>

            <Box>
                {myGames}
            </Box>
        </Fragment>
    )
}
