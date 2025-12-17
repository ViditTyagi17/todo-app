import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../src/features/todoSlice"
import themeReducer from "../src/features/themeSlice"


const store = configureStore({
    reducer:{
       todo: todoReducer,
       theme:themeReducer,

    }
 
})

export default store;