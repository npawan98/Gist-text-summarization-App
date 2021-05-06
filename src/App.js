import React from 'react'
import ScanScreen from './pages/ScanScreen'
import SignIn from './pages/SignIn'
import {useAuthState} from 'react-firebase-hooks/auth';
import {db,auth} from './Firebase'
import Routes from './routes/Routes';

function App() {
    // const [user] = useAuthState(auth);
    const [user]="hey";
    // console.log(user?.photoURL);
    // return (
    //     <div className="app">
    //         <ScanScreen/>
    //     </div>
    // )
    if(!user) return <SignIn/>;
  return <Routes/>
}

export default App
