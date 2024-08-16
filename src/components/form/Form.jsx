// Imports:
import React from "react";

import Container from "react-bootstrap/Container";

import FormAdd from "./FormAdd";
import FormFilter from "./FormFilter";

///////////////////////////////////////////////////
// Component:
export default function Form({
  themeValue,
  todoArr,
  setTodoArr,
  setFilterdArr,
  setArrInLocalStorage,
}) {
  return (
    <Container>
      <FormAdd
        setTodoArr={setTodoArr}
        themeValue={themeValue}
        setArrInLocalStorage={setArrInLocalStorage}
      />
      <br />
      <FormFilter
        todoArr={todoArr}
        setTodoArr={setTodoArr}
        themeValue={themeValue}
        setFilterdArr={setFilterdArr}
      />
    </Container>
  );
}
