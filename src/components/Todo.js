import React, {useState, useEffect} from 'react'
import {db} from '../firebase/firebase.js'
import {useHistory} from 'react-router-dom'

let unsubscribe = () => {}

export default function Todo({user}) {

    const history = useHistory()
    const [text, setText] = useState('')
    const [mytodos, setTodos] = useState([])
    
    useEffect(()=>{
        if(user){
            const docRef = db.collection('todos').doc(user.uid)
             unsubscribe = docRef.onSnapshot(docSnap => {
            if(docSnap.exists){
                console.log(docSnap.data().todos)
                setTodos(docSnap.data().todos)
            }else{
                console.log('no docs')
            }
        })
        }else{
            history.push('/login')
        }    

        return () => {
            unsubscribe()
        }

    },[])
 

    const addTodo = () => {
       db.collection('todos').doc(user.uid).set({
        todos:[...mytodos, text]
       }) 
       setText('')
    }

    const deleteTodo = (deleteTodo) => {
         const docReference = db.collection('todos').doc(user.uid)
         docReference.get().then(docSnap => {
             const result = docSnap.data().todos.filter(todo => todo != deleteTodo)
             docReference.update({
                todos : result
            })
         })
        
    }

    return (
        <div className="container">
            <h1>Add Todos</h1>

            <div className="input-field">
                <input type="text" placeholder="Add Todo" value={text} onChange={(e) => {setText(e.target.value)}}/>
            </div>   
            <button className="btn red" onClick={()=>{addTodo()}}>Add</button>

          <ul className="collection">
              {mytodos.map(todo => {
                  return <li className="collection-item" key={todo}>{todo}  <i className="material-icons right" onClick={() => deleteTodo(todo)}>delete</i>  </li>      

              })}
        </ul>

        </div>
    )
}
