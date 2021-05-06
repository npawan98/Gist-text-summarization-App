import React from 'react'
import ScanScreen from './pages/ScanScreen'
import SignIn from './pages/SignIn'
import {useAuthState} from 'react-firebase-hooks/auth';
import {db,auth} from './Firebase'
import Routes from './routes/Routes';
import Loading from './components/Loading';

function App() {
    const [user,loading] = useAuthState(auth);

    if(loading) return <Loading/>
    if(!user) return <SignIn/>;
  return <Routes/>
}

export default App
