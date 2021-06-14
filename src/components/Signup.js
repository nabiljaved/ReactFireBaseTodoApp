import React,{useState, useContext, useEffect} from 'react'
import {auth} from '../firebase/firebase.js'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext.js'

export default function SignUp({user}) {

    const {dispatch} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const result = await auth.createUserWithEmailAndPassword(email, password)
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

    const CheckLogedInUser = user != null ?  (
            <h1>You Are Already Logged In </h1>
        ) :  (   
            
          <div className="container center" style={{maxWidth: "700px"}}>
            <h3>Please Signup !!</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-field">
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn red">Sign Up</button>
         </form>
      </div>
        )
    

    return (
        <>
            {CheckLogedInUser}
        </>
    )
}

