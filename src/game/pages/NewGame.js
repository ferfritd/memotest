import React, {useState} from 'react'

import Input from '../Components/input'

export default function NewGame() {



    const [cards, setCards] = useState([])
    const [numberOfPairs, setNumberOfPairs] = useState(2)


    
    const inputArray = new Array(numberOfPairs).fill("_").map((el, i) => <Input key={i}/>)


    return (
        <div>
            <form>
                {inputArray}
                <button type="submit">Create deck</button>
            </form>
        </div>
    )
}
