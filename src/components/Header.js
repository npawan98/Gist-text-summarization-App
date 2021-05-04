import { Avatar } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import '../styles/Header.css'

function Header() {
    const [user] = useAuthState(auth);
    return (
        <div className="header">
            <div className="header__left">
                <h1>Hello {user?.displayName} !</h1>
            </div>
            <div>
                <Avatar src={user?.photoURL} onClick={()=>auth.signOut()}/>
            </div>
        </div>
    )
}

export default Header
