import { useState } from "react";
import styles from "../todos.module.css";
import { GiCancel } from "react-icons/gi";
import useLocalStorage from "../hooks/useLocalStorage";

export function Todo(props) {
  const [done, setDone] = useLocalStorage(props.todoKey, false);

  function toggleTodoState(e) {
    var currentState = e.target.checked;
    setDone(currentState);
  }

  return (
    <div className={styles.Todo}>
      <input
        type={"checkbox"}
        id={props.todoName}
        className={styles.TodoCheckbox}
        onClick={toggleTodoState}
        checked={done ? true : false}
      ></input>
      <label
        htmlFor={props.todoName}
        className={done ? styles.TodoLabelDone : styles.TodoLabel}
      >
        {props.todoName}
      </label>
      <GiCancel
        size={30}
        onClick={() => props.deleteTodo(props.todoKey)}
        className={styles.CancelIcon}
      ></GiCancel>
    </div>
  );
}
