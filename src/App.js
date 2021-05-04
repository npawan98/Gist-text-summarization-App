import React from 'react'
import ScanScreen from './pages/ScanScreen'
import SignIn from './pages/SignIn'
import {useAuthState} from 'react-firebase-hooks/auth';
import {db,auth} from './Firebase'

function App() {
    const [user] = useAuthState(auth);
    // console.log(user?.photoURL);
    // return (
    //     <div className="app">
    //         <ScanScreen/>
    //     </div>
    // )
    if(!user) return <SignIn/>;
  return <ScanScreen/>
}

export default App
