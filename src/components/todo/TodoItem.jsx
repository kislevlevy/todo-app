// Imports:
import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

///////////////////////////////////////////////////
// Component:
export default function TodoItem({
  todoItem,
  setTodoArr,
  todoArr,
  setIsEditing,
  setArrInLocalStorage,
}) {
  // Component state veriables:
  const urgency = {
    first: "🔴",
    next: "🟡",
    later: "🟢",
  };

  // Component function:
  const markComplete = function () {
    const newArr = todoArr;
    newArr.map(
      (ele) => ele.id === todoItem.id && (ele.isCompleted = !ele.isCompleted)
    );
    setTodoArr(setArrInLocalStorage(newArr));
  };
  const deleteItem = function () {
    const newArr = todoArr;
    newArr.splice(
      newArr.findIndex((ele) => ele.id === todoItem.id),
      1
    );
    setTodoArr(setArrInLocalStorage(newArr));
  };

  // Component HTML return:
  return (
    <Accordion.Item eventKey={todoItem.id}>
      <Accordion.Header
        style={
          todoItem.isCompleted ? { textDecorationLine: "line-through" } : {}
        }
      >
        <span>{urgency[todoItem.urgency]}&#160;</span>
        {todoItem.title}
      </Accordion.Header>
      <Accordion.Body>
        <Card className="text-center">
          <Card.Header>
            Due - {new Date(todoItem.due).toLocaleDateString("HEB")}
          </Card.Header>
          <Card.Body>
            <Card.Title>{todoItem.title}</Card.Title>
            <Card.Text>{todoItem.desc}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <ButtonGroup>
              <Button onClick={markComplete} variant="success">
                {!todoItem.isCompleted
                  ? "Mark as completed"
                  : "Mark as uncompleted"}
              </Button>
              <Button
                onClick={() => setIsEditing(todoItem.id)}
                variant="primary"
              >
                ✏️
              </Button>
              <Button onClick={deleteItem} variant="danger">
                🗑️
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Accordion.Body>
    </Accordion.Item>
  );
}
