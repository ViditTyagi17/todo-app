import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useSelector } from "react-redux";

function App() {
 

  const todos=useSelector((state)=>state.todo.todos)
    


  return (
    
  <div className="bg-white dark:bg-[#172842] min-h-screen py-8 transition-colors duration-300">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-gray-900 dark:text-white transition-colors duration-300">
      
      <div className="flex justify-between items-center mb-8 mt-2">
        <h1 className="text-2xl font-bold">Manage Your Todos</h1>
        <ThemeSwitcher />
      </div>

      {/* <div className="mb-4">
        <TodoForm />
      </div>

      <div className="flex flex-wrap gap-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="w-full">
            <TodoItem todo={todo} />
          </div>
        ))}
      </div> */}
      <div className="mb-6">
  <div className="bg-gray-100 dark:bg-[#1f2a48] p-4 rounded-lg shadow-sm transition-colors duration-300">
    <TodoForm />
  </div>
</div>

<div className="flex flex-col gap-3">
  {todos.length === 0 ? (
    <p className="text-center text-gray-500 dark:text-gray-400 italic">
      No todos yet — start by adding one!
    </p>
  ) : (
    todos.map((todo) => (
      <div key={todo.id} className="w-full">
        <TodoItem todo={todo} />
      </div>
    ))
  )}
</div>


    </div>
  </div>


  );
}

export default App;
