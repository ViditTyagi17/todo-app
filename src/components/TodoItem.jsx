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
      className={`sm:flex  flex-col gap-3  border border-black/10 rounded-lg p-4   dark:text-white text-black
        transition-colors duration-200 ease-in-out
         ${
           todo.completed
             ? "bg-green-200 dark:bg-green-800"
             : "bg-[#EFC3CA] dark:bg-neutral-700"
         }`}
    >
      <textarea
        className={`w-full rounded-lg p-3 text-sm sm:text-base resize-none
              border outline-none bg-transparent
              
              ${
                isTodoEditable
                  ? "border-black/10 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  : "border-transparent"
              }
              ${
                todo.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : ""
              }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <div
        className="flex  gap-3 justify-between items-center whitespace-nowrap
"
      >
        <div className="flex justify-evenly gap-2">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={todo.completed}
            onChange={toggleTodos}
          />
          <button
            className="cursor-pointer inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
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
            className="cursor-pointer inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            ❌
          </button>
        </div>
        <div
          className="flex flex-col gap-1 justify-center items-center whitespace-nowrap
"
        >
          {todo.completed ? (
            <>
              <p className="text-sm dark:text-gray-400 text-gray-500 ">
                ✅ Completed{" "}
              </p>
            </>
          ) : (
            <>
              <p
                className={`text-sm ${
                  isOverdue
                    ? "text-red-600 dark:text-red-400"
                    : "  text-green-600 dark:text-green-400"
                }`}
              >
                📅 {todo.deadline ? todo.deadline : "No deadline"}
              </p>
              <p>
                {daysLeft < 0
                  ? `Overdue by ${Math.abs(Math.ceil(daysLeft))} days`
                  : daysLeft === 0
                  ? "Due today"
                  : `${daysLeft} days left`}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
