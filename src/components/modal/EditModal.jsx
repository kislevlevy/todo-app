// Imports:
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

///////////////////////////////////////////////////
// Component:
export default function EditModal({
  isEditing,
  setIsEditing,
  todoArr,
  setTodoArr,
  themeValue,
  setArrInLocalStorage,
}) {
  // Component state veriables:
  const [task, setTask] = useState({});
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);

  // Component functions:
  const setValue = (key, value) =>
    setTask((oldObj) => ({ ...oldObj, [key]: value }));

  const handleClose = () => {
    setShow(false);
    setIsEditing(null);
  };

  const updateItem = function (e) {
    e.preventDefault();
    console.log(item, task);

    const obj = { ...item, ...task };
    const arr = todoArr.map((ele) => (ele.id === obj.id ? obj : ele));
    setTodoArr(setArrInLocalStorage(arr));
    setTask({});
    setItem(null);
    setIsEditing("");
  };

  useEffect(() => {
    setShow(!!isEditing);
    setItem(setShow && todoArr?.find((ele) => ele.id === isEditing));
  }, [isEditing, todoArr]);

  // Component HTML return:
  if (item)
    return (
      <Modal show={show} onHide={handleClose} data-bs-theme={themeValue}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white">Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="task-form-add" className="m-2" data-bs-theme={themeValue}>
            <FloatingLabel
              label="Title"
              className="mb-2"
              style={themeValue === "dark" ? { color: "#d1cfcd" } : {}}
            >
              <Form.Control
                type="text"
                placeholder=""
                onInput={(e) => setValue("title", e.target.value)}
                defaultValue={item.title}
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
                defaultValue={item.desc}
              />
            </FloatingLabel>

            <ToggleButtonGroup
              type="radio"
              name="options"
              className="w-100 mb-2"
              defaultValue={item.urgency}
            >
              <ToggleButton
                value="first"
                id="tbg-btn-4"
                variant="outline-danger"
                onChange={(e) => setValue("urgency", e.target.value)}
              >
                First
              </ToggleButton>
              <ToggleButton
                value="next"
                id="tbg-btn-5"
                variant="outline-warning"
                onChange={(e) => setValue("urgency", e.target.value)}
              >
                Next
              </ToggleButton>
              <ToggleButton
                value="later"
                id="tbg-btn-6"
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
                defaultValue={item.due}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
