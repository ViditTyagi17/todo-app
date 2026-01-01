import React, { useState } from "react";

import { addTodo } from "../features/todoSlice";
import { useDispatch } from "react-redux";
function TodoForm() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [dedline, setDedline] = useState("");

  const add = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        message: todo,
        deadline: dedline,
      })
    );

    setTodo("");
    setDedline("");
  };

  return (
    <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 w-full ">
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
        placeholder="Write Todo..."
        className="flex-1 border border-black/10 rounded-lg px-3 py-2 
             outline-none bg-white dark:bg-neutral-700 
             text-black dark:text-white 
             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
             transition duration-150"
      />
      <input
        type="date"
        className="flex-1 border border-black/10 rounded-lg px-3 py-2
              outline-none        
             bg-white dark:bg-neutral-700 
             text-black dark:text-white 
             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
             transition duration-150"
        value={dedline}
        onChange={(e) => setDedline(e.target.value)}
      />
      <button
        type="submit"
        className="cursor-pointer rounded-lg px-4 py-2 bg-green-600 text-white 
             hover:bg-green-700 
             focus:ring-2 focus:ring-green-500 
             transition duration-150 shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
