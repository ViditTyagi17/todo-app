import React, { useState } from 'react'

import { addTodo } from '../features/todoSlice'
import { useDispatch } from 'react-redux'
function TodoForm() {

 
  const dispatch=useDispatch()
  const [todo,setTodo]=useState("")

const add =(e)=>{
e.preventDefault()
dispatch(addTodo(todo))

setTodo("")
}




  return (
     <form onSubmit={add}  className="flex">
            <input  
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
  )
}

export default TodoForm
