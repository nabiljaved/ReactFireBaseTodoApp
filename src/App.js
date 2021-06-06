import Navbar from './components/Navbar.js'
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import Todo from './components/Todo.js'
import Login from './components/Login.js'
import SignUp from './components/Signup.js'
import React, {useState, useEffect} from 'react'
import {auth} from './firebase/firebase.js'


function App() {
  const [user, setUser] = useState('')
  //i want it to call one time only
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
      return () => {unsubscribe()}
    })
  }, [])


  return (
    <BrowserRouter>
      <Navbar user={user}/>
      <Switch>
        <Route exact path='/'>
            <Todo user={user}/>
        </Route>
        <Route path='/login'>
            <Login />
        </Route>
        <Route path='/signup'>
            <SignUp/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
