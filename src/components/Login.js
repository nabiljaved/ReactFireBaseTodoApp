import React, {useState, useContext, useEffect} from 'react'
import {auth} from '../firebase/firebase.js'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext.js'

export default function Login({user}) {

    const history = useHistory()

    const {dispatch} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const handleSubmit = async (e) => {
        e.preventDefault()      
        try{
            const result = await auth.signInWithEmailAndPassword(email, password)
            window.M.toast({html:`welcome ${result.user.email}`, classes:'green'})
            history.push('/')
            const useremail = result.user.email
            const userid = result.user.uid
            dispatch({type: 'ADD_USER', user: {useremail, userid}})            
        }catch(err){
            console.log(err)
            window.M.toast({html:`Error ${err.message}`, classes:'green'})
        }
    }

    return user == null ? (
        <div className="container center" style={{maxWidth: "700px"}}>
            <h3>Please Login !!</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-field">
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn red">Login</button>
        </form>
    </div>
    ) : (<h1>You are Already Logged In ..</h1>)
}

