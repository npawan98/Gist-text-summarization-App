import React from 'react'
import '../styles/SignIn.css'
import mainImage from '../assets/main.webp'
import signinBtn from '../assets/btn_google_signin.png'
import { auth, provider } from '../Firebase'

function SignIn() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <div className="signIn">
            <div className="signIn__header">
                <h1>SignIn</h1>
            </div>

            <div className="signIn__body">
                <div className="main__image">
                    <img src={mainImage} />
                </div>
                <div className="signIn__btn">
                    <img src={signinBtn} onClick={signIn} />
                </div>

            </div>
        </div>
    )
}

export default SignIn
