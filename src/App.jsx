import { useRef, useEffect } from "react";
import styles from "./todos.module.css";
import { Todo } from "./Components/Todo";
import useLocalStorage from "./hooks/useLocalStorage";
import uuid from "react-uuid";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const inputRef = useRef();

  useEffect(() => {
    function handleKeyboard(e) {
      if (e.key === "Enter" && inputRef.current.value !== "") {
        addTodo();
      }
    }
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  function addTodo() {
    var todoName = inputRef.current.value;
    if (!todoName) return;
    setTodos((oldTodos) => [...oldTodos, { id: uuid(), name: todoName }]);
    inputRef.current.value = "";
  }

  function deleteTodo(todoKey) {
    console.log(todoKey);
    localStorage.removeItem(todoKey);
    setTodos((oldTodos) => {
      var newTodos = oldTodos.filter((todo) => todo.id !== todoKey);
      return newTodos;
    });
  }

  return (
    <div className={styles.MainWrapper}>
      <div className={styles.Todos}>
        <div className={styles.Header}>Todo List:</div>
        <div className={styles.SearchBarContainer}>
          <input
            type={"text"}
            className={styles.Searchbar}
            ref={inputRef}
          ></input>
          <button className={styles.btnAdd} onClick={addTodo}>
            Hinzufügen
          </button>
        </div>
        <ul className={styles.List}>
          {todos.map((todo) => {
            return (
              <Todo
                key={uuid()}
                todoName={todo.name}
                todoKey={todo.id}
                deleteTodo={deleteTodo}
                className={styles.TodoListItem}
              ></Todo>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
