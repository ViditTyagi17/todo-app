import { useDispatch } from "react-redux";
import useTheme from "../features/useTheme";
import { themeToggler } from "../features/themeSlice";

function ThemeSwitcher() {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <>
      <input type="checkbox" role="switch" />
      <button
        type="toggle"
        className=' className="px-3 py-1 rounded-md bg-blue-500 text-white dark:bg-yellow-400 dark:text-black transition-colors duration-300'
        onClick={() => dispatch(themeToggler())}
      >
        {theme === "dark" ? "Light ☀️" : "Dark 🌙"}
      </button>
    </>
  );
}

export default ThemeSwitcher;
