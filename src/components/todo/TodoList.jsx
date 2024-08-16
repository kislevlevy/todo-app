// Imports:
import React from "react";

import Accordion from "react-bootstrap/Accordion";
import TodoItem from "./TodoItem";

///////////////////////////////////////////////////
// Component:
export default function TodoList({
  themeValue,
  todoArr,
  setTodoArr,
  setIsEditing,
  setArrInLocalStorage,
}) {
  return (
    <Accordion
      defaultActiveKey="0"
      className="m-2"
      alwaysOpen
      data-bs-theme={themeValue}
    >
      {todoArr &&
        todoArr
          .sort((a, b) => new Date(a.due) - new Date(b.due))
          .map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              setTodoArr={setTodoArr}
              todoArr={todoArr}
              setIsEditing={setIsEditing}
              setArrInLocalStorage={setArrInLocalStorage}
            />
          ))}
    </Accordion>
  );
}
