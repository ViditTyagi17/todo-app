import { useEffect } from "react";
import { useState } from "react";

import { updateTodo, toggleTodo, deleteTodo } from "../features/todoSlice";
import { useDispatch } from "react-redux";
function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.message);
  const dispatch = useDispatch();
  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date();

  const today = new Date();
  const due = new Date(todo.deadline);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const daysLeft = (due - today) / (1000 * 60 * 60 * 24);

  useEffect(() => {
    setTodoMsg(todo.message);
  }, [todo.message]);

  const editTodo = () => {
    dispatch(updateTodo({ id: todo.id, message: todoMsg }));

    setIsTodoEditable(false);
  };

  const toggleTodos = () => {
    dispatch(toggleTodo(todo.id));
  };

  return (
    <div
      className={`flex items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-xl shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleTodos}
      />

   <textarea
  className={`border outline-none w-full bg-transparent rounded-lg ${
    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
  } ${todo.completed ? "line-through" : ""}`}
  value={todoMsg}
  onChange={(e) => {
    setTodoMsg(e.target.value);
    e.target.style.height = "auto"; 
    e.target.style.height = `${e.target.scrollHeight}px`; 
  }}
  readOnly={!isTodoEditable}
  rows={1}
  style={{ resize: "none", overflow: "hidden" }}
/>
      {/* <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      /> */}
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
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        ❌
      </button>
      <div className="flex flex-col gap-1 justify-center items-center whitespace-nowrap
">

      <p className={`text-sm ${isOverdue ? "text-red-600" : "text-gray-600"}`}>
        📅 {todo.deadline ? todo.deadline : "No deadline"}
      </p>
      <p>
        {daysLeft < 0
          ? `Overdue by ${Math.abs(Math.ceil(daysLeft))} days`
          : daysLeft === 0
          ? "Due today"
          : `${daysLeft} days left`}
      </p>
      </div>
    </div>
  );
}

export default TodoItem;
