import { v4 as uuidV4 } from "uuid";


const addDeckToCollection = (deckObject) => {
    
    const date = new Date().toLocaleDateString()
                const time = new Date().toLocaleTimeString()
                
                const deck = {id:uuidV4(), title:deckObject.title, deck:deckObject.deck, timeStamp:`Created on ${date} at ${time}`}
                let deckCollection = JSON.parse(localStorage.getItem
                ('deckCollection'))


                if(!deckCollection){
                    localStorage.setItem('deckCollection', JSON.stringify([deck]))
                    deckCollection = JSON.parse(localStorage.getItem
                        ('deckCollection')) 
                } else {
                    deckCollection.unshift({...deck})
                    localStorage.setItem('deckCollection', JSON.stringify(deckCollection))
                }

                localStorage.setItem('currentDeck',JSON.stringify(deck))

                return deckCollection
}

export default addDeckToCollection