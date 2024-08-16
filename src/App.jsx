// Imports:
import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "./components/form/Form";
import Navigation from "./components/nav/Navigation";
import TodoList from "./components/todo/TodoList";
import EditModal from "./components/modal/EditModal";

///////////////////////////////////////////////////
// Component:
export default function App() {
  // Component states:
  const [themeValue, setThemeValue] = useState("light");
  const [todoArr, setTodoArr] = useState(null);
  const [filterdArr, setFilterdArr] = useState(todoArr);
  const [isEditing, setIsEditing] = useState(null);

  // Component functions:
  useEffect(() => {
    if (localStorage.getItem("todo-list"))
      setTodoArr(JSON.parse(localStorage.getItem("todo-list")));
  }, []);
  const setArrInLocalStorage = function (arr) {
    localStorage.setItem("todo-list", JSON.stringify(arr));
    return arr;
  };

  // Component HTML return:
  return (
    <>
      <EditModal
        todoArr={todoArr}
        setTodoArr={setTodoArr}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        themeValue={themeValue}
        setArrInLocalStorage={setArrInLocalStorage}
      />
      <Container
        style={
          themeValue === "dark"
            ? { backgroundColor: "darkgrey", borderRadius: "15px" }
            : { borderRadius: "15px" }
        }
      >
        <Row>
          <Col>
            <Navigation themeValue={themeValue} setThemeValue={setThemeValue} />
          </Col>
        </Row>
        <Row>
          <Col className="col-lg-4 col-md-6 col-12">
            <Form
              todoArr={todoArr}
              setTodoArr={setTodoArr}
              setFilterdArr={setFilterdArr}
              themeValue={themeValue}
              setArrInLocalStorage={setArrInLocalStorage}
            />
          </Col>
          <Col>
            <TodoList
              todoArr={filterdArr}
              setTodoArr={setTodoArr}
              themeValue={themeValue}
              setIsEditing={setIsEditing}
              setArrInLocalStorage={setArrInLocalStorage}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
