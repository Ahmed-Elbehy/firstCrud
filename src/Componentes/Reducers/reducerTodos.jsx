import { v4 as uuidv4 } from "uuid";
export default function ReducerTodo(stat, action) {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      const newTodos = [
        ...stat,
        { id: uuidv4(), title: payload, description: "", check: false },
      ];
      localStorage.setItem("todoLocal", JSON.stringify(newTodos));
      return newTodos;
    };
    case "updat": {
      //    setTodos(newTodos);
      // setOpenUpdatModal(false);
      const newTodos = stat.map((t) => {
        if (t.id === payload.toggleTodoId.id) {
          return {
            ...t,
            title: payload.updateFildes.title,
            description: payload.updateFildes.description,
          };
        };
        return t;
      });
      localStorage.setItem("todoLocal", JSON.stringify(newTodos));
      return newTodos;
    };
    case "delet": {
      const newTodos = stat.filter((t) => {
        return t.id !== payload.toggleTodoId;
      });
      localStorage.setItem("todoLocal", JSON.stringify(newTodos));
      return newTodos;
    };
    case "geting": {
      const getTodosLocaly = JSON.parse(localStorage.getItem("todoLocal"));
      return Array.isArray(getTodosLocaly) ? getTodosLocaly : stat;
    };
    case "check":{
         const newTodos = stat.map((t) => {
      if (t.id === payload.id) {
        return { ...t, check: !t.check };
      }
      return t;
    });
    // setTodos(newTodos);
    localStorage.setItem("todoLocal", JSON.stringify(newTodos));
    return newTodos
    }
    default: {
      throw new Error(type);
    };
  };
};
