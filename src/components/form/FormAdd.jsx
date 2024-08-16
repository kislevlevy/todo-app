// Imports:
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { v4 as uuid } from "uuid";

///////////////////////////////////////////////////
// Component:
export default function FormAdd({
  themeValue,
  setTodoArr,
  setArrInLocalStorage,
}) {
  // State veriables:
  const [task, setTask] = useState({});

  // Component functions:
  const setValue = (key, value) =>
    setTask((oldObj) => ({ ...oldObj, [key]: value }));

  const addTask = function (e) {
    e.preventDefault();
    if (!task || !task.title) return;
    const obj = { ...task };

    !obj.urgency && (obj.urgency = "next");
    if (!obj.due || new Date(obj.due) < Date.now()) {
      obj.due = new Date(Date.now() + 86_400_000 * 7).toLocaleDateString(
        "en-CA"
      );
    }
    obj.id = uuid();
    obj.isCompleted = false;

    setTodoArr((oldArray) => {
      if (!oldArray) return setArrInLocalStorage([obj]);
      return setArrInLocalStorage([...oldArray, obj]);
    });
    document.querySelector("#task-form-add").reset();
    setTask({});
  };

  // Return HTML:
  return (
    <Form id="task-form-add" className="m-2" data-bs-theme={themeValue}>
      <Form.Label>Add new task:</Form.Label>
      <FloatingLabel
        label="Title"
        className="mb-2"
        style={themeValue === "dark" ? { color: "#d1cfcd" } : {}}
      >
        <Form.Control
          type="text"
          placeholder=""
          onInput={(e) => setValue("title", e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        label="Details"
        className="mb-2"
        style={themeValue === "dark" ? { color: "#d1cfcd" } : {}}
      >
        <Form.Control
          as="textarea"
          placeholder=""
          style={{ height: "100px" }}
          onInput={(e) => setValue("desc", e.target.value)}
        />
      </FloatingLabel>

      <ToggleButtonGroup type="radio" name="options" className="w-100 mb-2">
        <ToggleButton
          value="first"
          id="tbg-btn-1"
          variant="outline-danger"
          onChange={(e) => setValue("urgency", e.target.value)}
        >
          First
        </ToggleButton>
        <ToggleButton
          value="next"
          id="tbg-btn-2"
          variant="outline-warning"
          onChange={(e) => setValue("urgency", e.target.value)}
        >
          Next
        </ToggleButton>
        <ToggleButton
          value="later"
          id="tbg-btn-3"
          variant="outline-success"
          onChange={(e) => setValue("urgency", e.target.value)}
        >
          Later
        </ToggleButton>
      </ToggleButtonGroup>

      <FloatingLabel label="Due date" className="mb-2">
        <Form.Control
          type="date"
          placeholder=""
          style={{ height: "50px" }}
          onInput={(e) => setValue("due", e.target.value)}
        />
      </FloatingLabel>
      <Button className="w-100" type="click" onClick={addTask}>
        Add new task now!
      </Button>
    </Form>
  );
}
