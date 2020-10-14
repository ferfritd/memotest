import React from 'react'

import './Card.css'

export default function Card({info, clicked}) {


    return (
            <div className='card' onClick={!info.isTurned ? clicked : () => {}} disabled={info.isTurned}>
                <div className={!info.isTurned ? "card-front grey-background" : "card-back"}>?</div>
                <div className={!info.isTurned ? "card-back" : "card-front white-background"}>
                    <p>
                        {info.value}
                    </p>
                    </div>

            </div>
    )
}
