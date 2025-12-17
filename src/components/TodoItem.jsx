import {useEffect} from "react";
import { useState } from "react";

import { updateTodo,toggleTodo,deleteTodo } from "../features/todoSlice";
import { useDispatch } from "react-redux";
function TodoItem({ todo }) {
  
  const [isTodoEditable,setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.message)
  const dispatch=useDispatch()

  useEffect(() => {
  setTodoMsg(todo.message);
}, [todo.message]);

  const editTodo=()=>{
    dispatch(updateTodo({id:todo.id,message:todoMsg}))
    
    setIsTodoEditable(false)
  }

  const toggleTodos =()=>{
    dispatch(toggleTodo(todo.id))

  }

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-xl shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleTodos}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => dispatch( deleteTodo(todo.id))}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
