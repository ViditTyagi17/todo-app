import { useDispatch } from "react-redux";
import useTheme from "../features/useTheme";
import { themeToggler } from "../features/themeSlice";

function ThemeSwitcher() {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <>
      
      <button
        type="button"
        className='cursor-pointer px-3 py-1 rounded-md  dark:text-white  text-black transition-colors duration-300'
        onClick={() => dispatch(themeToggler())}
      >
        {theme === "dark" ? "Light ☀️" : "Dark 🌙"}
      </button>
    </>
  );
}

export default ThemeSwitcher;
