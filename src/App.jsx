import "./App.css";
import TodosBox from "./Componentes/TodosBox";
import { TodosReducerProvider } from "./Componentes/context/context.jsx";
function App() {
  return (
    <>
      <TodosReducerProvider>
        <TodosBox />
      </TodosReducerProvider>
    </>
  );
}

export default App;
