import { useContext, createContext, useReducer } from "react"; 
import ReducerTodo from "../Reducers/reducerTodos";
// import { v4 as uuidv4 } from "uuid";
// Array Todos

// created Context Todos
const TodosProvider = createContext([]);
const dispatchProvid = createContext(null);

// create Context provider
export function TodosReducerProvider({ children }) {
  // todo state
  const [todos,dispatch] = useReducer(ReducerTodo,[])
  return(
    <>
    <dispatchProvid.Provider value={dispatch}>
    <TodosProvider.Provider value={todos}>
      {children}
    </TodosProvider.Provider>
    </dispatchProvid.Provider>
    
    </>
  )

}
// Use Context Used as A UseState
export function useTodos() {
  const context = useContext(TodosProvider);
  if (context === null) {
    throw new Error("useTasks لازم يتستخدم جوه , from UseDispatch");
  }
  return context;
}
export function useDispactch() {
  const context = useContext(dispatchProvid);
  if (context === null) {
    throw new Error("useTasks لازم يتستخدم جوه , from UseDispatch");
  }
  return context;
}

//
