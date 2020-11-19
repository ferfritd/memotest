import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { DeckContext } from '../../shared/Context/DeckContextProvider'

import useForm from '../../shared/hooks/useForm'

import useDidMountEffect from '../../shared/hooks/useDidMountEffect'

import Input from '../Components/input'
import Button from "../../shared/UI/Button"
import Box from '../../shared/UI/Box'

import "./GameForm.css";


export default function EditGame(props) {

    document.title = props.title

    const history = useHistory()

    const {onCreateDeck, onsetTitle, onSetCollection} = useContext(DeckContext)

    const deckId = useParams().deckId
    const deckCollection = JSON.parse(localStorage.getItem('deckCollection'))
    const selectedDeck = deckCollection.filter(deck => {
        return deck.id === deckId
    })[0]

    const [state, {inputChangeHandler, changeTitleHandler, addInputHandler,removeInputHandler, submitFormHandler}] = useForm(selectedDeck.title, selectedDeck.deck)

    const inputArray = state.inputs.map((el, id) => {
        return (<div key={el.id} id={el.id} className="inputs-field">
        <p className="remove-input" onClick={()=>removeInputHandler(el.id)}>Remove</p>
        <p className="input-number">{`${id + 1}`}</p>
        <Input type="text" id={`${el.id}-firstInput`} value={el.pairs[0]} onInput={inputChangeHandler}/>
        <p className="dash">-</p>
        <Input type="text" value={el.pairs[1]} id={`${el.id}-secondInput`} onInput={inputChangeHandler}/>
        </div>)
        })

        useDidMountEffect(() => {

            const deckIndex = deckCollection.findIndex((deck => {
                return deck.id === deckId
            }))

            const newDeck = {...selectedDeck, deck: state.deck, title:state.title}

            deckCollection[deckIndex] = newDeck

            onSetCollection(deckCollection)
            localStorage.setItem('deckCollection',JSON.stringify(deckCollection))

            
            const currentDeck = JSON.parse(localStorage.getItem('currentDeck'))

            if(currentDeck.id === selectedDeck.id){
                localStorage.setItem('currentDeck', JSON.stringify(newDeck))
                onCreateDeck(state.deck)
                onsetTitle(state.title)
            }

            history.push('/my-games')
        
        }, [state.deck])




    return (
        <React.Fragment>
            <h1 style={{textAlign:"center", marginBottom:"4rem"}}>Edit Deck</h1>
            <Box>
                <form className="deck-form" onSubmit={submitFormHandler}>
                    <Input classes="title-input" value={state.title} id="deckName" placeholder="Insert deck's name" onInput={changeTitleHandler}/>
                    {inputArray}
                    <div className="add-buttons">
                        <Button type="button" classes="button button-main button-small button-circle" click={() => addInputHandler(1)}>+1</Button>
                        <Button type="button" classes="button button-inverted button-small button-circle" click={() => addInputHandler(4)}>+4</Button>
                    </div>
                    <div className="button-container">
                    <Button type="submit" classes="button button-main">Edit deck</Button>
                    </div>
                </form>
            </Box>
        </React.Fragment>
        
        
    )
}
