import React from 'react'
import '../styles/Button.css'

function Button({name, bgColor,txtColor}) {
    return (
        <div className = "button" style={{background: `${bgColor}`}}>
            <h2 style={{color: `${txtColor}`}}>{name}</h2>
        </div>
    )
}

export default Button
