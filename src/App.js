import React, {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useSelector, useDispatch} from 'react-redux'

import './App.css';

import Login from './components/Login';
import Main from './components/Main'
import { auth } from './firebase/firebase'
import { selectUser, login,logout } from './redux/features/userSlice'


function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if(authUser){
        
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName,
        }))
      }else{
        dispatch(logout())
      }
    })
    
  }, [dispatch])
  return (
    <div className="App">
      {
        user ? <Main /> : <Login />
      }
      
    </div>
  );
}

export default App;
