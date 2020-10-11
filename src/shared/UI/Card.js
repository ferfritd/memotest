import React from 'react'

export default function Card({info, clicked}) {

    return (
        <div>
            <button onClick={clicked} disabled={info.isTurned}>{info.value}</button>
            <span style={{color: info.pair.isTurned ? 'red' : 'black'}}>{info.pair.value}</span>
        </div>
    )
}
