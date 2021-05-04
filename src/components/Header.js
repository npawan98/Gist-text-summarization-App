import { Avatar } from '@material-ui/core'
import React from 'react'
import '../styles/Header.css'

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <h1>Hello User !</h1>
            </div>
            <div>
                <Avatar/>
            </div>
        </div>
    )
}

export default Header
