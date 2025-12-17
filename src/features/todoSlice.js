import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || []


}
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {

      const newtodo = {
        id: Date.now(),
        message: action.payload,
         completed: false,
      }

      state.todos.push(newtodo)
      localStorage.setItem("todo",JSON.stringify(state.todos))

    }

    ,
    deleteTodo: (state, action) => {
     state.todos= state.todos.filter((todo) => todo.id !== action.payload)
     localStorage.setItem("todos",JSON.stringify(state.todos))

    },
    updateTodo: (state, action) => {
      const { id, message } = action.payload
      const todo= state.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.message = message
      }
       localStorage.setItem("todos",JSON.stringify(state.todos))

    },
    toggleTodo:(state,action)=>{
       const todo=state.todos.find((todo)=>todo.id=== action.payload)
       if(todo){
        todo.completed=!todo.completed
       }
    }

  }
}
)
export const {addTodo,deleteTodo,updateTodo,toggleTodo}=todoSlice.actions
export default todoSlice.reducer