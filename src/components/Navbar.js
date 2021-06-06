import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../firebase/firebase.js'
import {useHistory} from 'react-router-dom'


export default function Navbar({user}) {
    const history = useHistory()
    const logOut = () => {
        auth.signOut()
        history.push('/login')
    }
    return (
        <div>
        <nav>
        <div className="nav-wrapper purple">   
        <Link to="/" className="brand-logo">Todo</Link>
        <ul id="nav-mobile" className="right">
        {user !=null ? <li> <button className="btn red" onClick={()=>logOut()}>Logout</button></li> 
        : 
        <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        </>
        }
       </ul>
     </div>
    </nav> 
   </div>
    )
}
