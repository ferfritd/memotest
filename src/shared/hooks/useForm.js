import { useReducer } from 'react'
import { v4 as uuidV4 } from "uuid";


const formReducer = (state, action) => {
    
    let newState = {...state}
    switch(action.type){
        case 'CHANGETITLE':
            newState.title = action.value
            return newState
        case 'INPUTCHANGE':
            newState.inputs.forEach(pair => {
                let firstId = pair.id.concat('-firstInput')
                let secondId = pair.id.concat('-secondInput')
                if(firstId === action.id){
                    pair.pairs[0] = action.value
                }
                if(secondId === action.id){
                    pair.pairs[1] = action.value
                }
            });
            return newState
        case "ADDINPUT":
            newState.inputs.push({id:uuidV4(), pairs:['','']})
            return newState
        case 'REMOVEINPUT':

        if(newState.inputs.length > 1){
            const filteredState = newState.inputs.filter(input => {
                return input.id !== action.inputId
            })

            newState = {...newState, inputs:filteredState}
        }
        
            return newState

        case 'SUBMITFORM':
            const finalDeck = []
            newState.inputs.forEach(pair => {
                if(pair.pairs[0] && pair.pairs[1]){
                    finalDeck.push(pair.pairs)
                }

            })
            newState.deck = finalDeck
            
            return newState
        default:
            return newState
    }
}


export default function useForm(title, deck) {

    let myInputs;

    if(deck.length > 0){
        myInputs = deck.map(pair => {
            return {id:uuidV4(),pairs:[pair[0], pair[1]]}
        })
    } else {
        myInputs = [
            {id:uuidV4(),pairs:['', '']},
            {id:uuidV4(),pairs:['', '']},
            {id:uuidV4(),pairs:['', '']},
            {id:uuidV4(),pairs:['', '']},
        ]    
    }
     
    const [state, dispatch] = useReducer(formReducer, 
        {
            inputs: myInputs,
            title: title,
            deck: deck
            
        })

        const inputChangeHandler = (id, value) => {
            dispatch({type:'INPUTCHANGE', id:id, value:value})
        }
    
        const changeTitleHandler = (id, value) => {
            dispatch({type:'CHANGETITLE', value:value})
        }

        const addInputHandler = () => {
            dispatch({type:"ADDINPUT"})
        }

        const removeInputHandler = (inputId) => {
            dispatch({type:'REMOVEINPUT', inputId:inputId})
        }
    
        const submitFormHandler = e => {
            e.preventDefault()
            dispatch({type:'SUBMITFORM'}) 
        }
     
    return [state, {inputChangeHandler, changeTitleHandler, addInputHandler, removeInputHandler, submitFormHandler}]
}
