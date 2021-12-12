import React, {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import './App.css';

import Login from './components/Login';
import Main from './components/Main'
import { auth } from './firebase/firebase'


function App() {

  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if(authUser){
        console.log(authUser)
        setUser(authUser)
        //login
      }else{
        //logout
      }
    })
    
  }, [])
  return (
    <div className="App">
      {
        user ? <Main user={user}/> : <Login />
      }
      
    </div>
  );
}

export default App;
