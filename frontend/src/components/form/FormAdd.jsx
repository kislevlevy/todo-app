// Imports:
import React, { useState, useContext } from 'react';

import ThemeContext from '../../context/ThemeProvider';
import TodoContext from '../../context/TodoProvider';

import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  FloatingLabel,
  Form,
} from 'react-bootstrap';

///////////////////////////////////////////////////
// Component:
export default function FormAdd() {
  // State veriables:
  const { themeValue } = useContext(ThemeContext);
  const { addNewTask, currentUser } = useContext(TodoContext);
  const [newtask, setNewTask] = useState({});

  // Component functions:
  const setValue = (key, value) =>
    setNewTask((oldObj) => ({ ...oldObj, [key]: value }));

  const addTask = function (e) {
    e.preventDefault();
    if (!currentUser) return;
    addNewTask(newtask);
    document.querySelector('#task-form-add').reset();
    setNewTask({});
  };

  // Return HTML:
  return (
    <Form id="task-form-add" className="m-2" data-bs-theme={themeValue}>
      <Form.Label>Add new task:</Form.Label>
      <FloatingLabel
        label="Title"
        className="mb-2"
        style={{ color: themeValue === 'dark' && '#d1cfcd' }}
      >
        <Form.Control
          type="text"
          placeholder=""
          onInput={(e) => setValue('title', e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        label="Details"
        className="mb-2"
        style={{ color: themeValue === 'dark' && '#d1cfcd' }}
      >
        <Form.Control
          as="textarea"
          placeholder=""
          style={{ height: '100px' }}
          onInput={(e) => setValue('desc', e.target.value)}
        />
      </FloatingLabel>

      <ToggleButtonGroup type="radio" name="options" className="w-100 mb-2">
        <ToggleButton
          value="first"
          id="tbg-btn-1"
          variant="outline-danger"
          onChange={(e) => setValue('urgency', e.target.value)}
        >
          First
        </ToggleButton>
        <ToggleButton
          value="next"
          id="tbg-btn-2"
          variant="outline-warning"
          onChange={(e) => setValue('urgency', e.target.value)}
        >
          Next
        </ToggleButton>
        <ToggleButton
          value="later"
          id="tbg-btn-3"
          variant="outline-success"
          onChange={(e) => setValue('urgency', e.target.value)}
        >
          Later
        </ToggleButton>
      </ToggleButtonGroup>

      <FloatingLabel label="Due date" className="mb-2">
        <Form.Control
          type="date"
          placeholder=""
          style={{ height: '50px' }}
          onInput={(e) => setValue('due', e.target.value)}
        />
      </FloatingLabel>
      <Button className="w-100" type="click" onClick={addTask}>
        Add new task now!
      </Button>
    </Form>
  );
}
