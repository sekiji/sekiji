import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./Components/inputtodo";
import { IncompleteTodos } from "./Components/incompletetodos";
import { CompleteTodos } from "./Components/completetodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [incompleteTodos, setIncompeleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompeleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompeleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompeleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompeleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>このままじゃ年末死ぬぞー！！</p>
      )}
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
      {completeTodos.length === 1 && (
        <p style={{ color: "blue" }}>まず一つできたね！えらいっ!</p>
      )}
      {completeTodos.length === 2 && (
        <p style={{ color: "blue" }}>その調子！</p>
      )}
      {completeTodos.length === 3 && (
        <p style={{ color: "blue" }}>えらいっ！</p>
      )}
      {completeTodos.length === 4 && (
        <p style={{ color: "blue" }}>あなたは神か</p>
      )}
      {completeTodos.length - incompleteTodos.length >= 4 && (
        <p style={{ color: "blue" }}>Congrats! よく頑張りました！お疲れ様！</p>
      )}
    </>
  );
};
