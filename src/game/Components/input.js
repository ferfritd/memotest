import React, {useReducer} from 'react'

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_FIRST_INPUT':
            return {...state, firstWord:action.value }
        case 'CHANGE_SECOND_INPUT':
            return {...state, secondWord:action.value }
        default:
            return state
    }

}



export default function Input(props) {

    const [state, dispatch] = useReducer(inputReducer, 
        {
            firstWord: "",
            secondWord: ""
        }
    )

    const firstInputChangeHandler = (event) => {
        dispatch(
            {
                type: 'CHANGE_FIRST_INPUT',
                value: event.target.value
            }
        )
    }

    const secondInputChangeHandler = (event) => {
        dispatch(
            {
                type: 'CHANGE_SECOND_INPUT',
                value: event.target.value
            }
        )
    }

    return (
        <div>
            <input type="text" onChange={firstInputChangeHandler} value={state.firstWord}/>
            <input type="text" onChange={secondInputChangeHandler} value={state.secondWord}/>
          </div>
    )
}
