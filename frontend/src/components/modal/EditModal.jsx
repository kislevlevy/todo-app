// Imports:
import React, { useContext, useEffect, useState } from 'react';

import ThemeContext from '../../context/ThemeProvider';
import TodoContext from '../../context/TodoProvider';

import {
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  FloatingLabel,
  Form,
} from 'react-bootstrap';

///////////////////////////////////////////////////
// Component:
export default function EditModal() {
  // Component state veriables:
  const { themeValue } = useContext(ThemeContext);
  const { isEditing, setIsEditing, todoArr, updateTask } = useContext(TodoContext);

  const [updatedFields, setUpdatedFields] = useState({});
  const [currentItem, setCurrentItem] = useState({});
  const [show, setShow] = useState(false);

  // Component functions:
  const setValueInFields = (key, value) =>
    setUpdatedFields((oldObj) => ({ ...oldObj, [key]: value }));

  const handleClose = () => {
    setShow(false);
    setIsEditing(null);
  };

  const handleUpdateItem = function (e) {
    e.preventDefault();
    const obj = { ...currentItem, ...updatedFields };
    updateTask(isEditing, obj);

    setUpdatedFields({});
    setCurrentItem({});
    handleClose();
  };

  useEffect(() => {
    if (!isEditing) return;
    setShow(true);
    setCurrentItem(todoArr.find((ele) => ele._id === isEditing));
  }, [isEditing, currentItem]);

  // Component HTML return:
  if (currentItem)
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
              style={{ color: themeValue === 'dark' && '#d1cfcd' }}
            >
              <Form.Control
                type="text"
                placeholder=""
                onInput={(e) => setValueInFields('title', e.target.value)}
                defaultValue={currentItem.title}
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
                onInput={(e) => setValueInFields('desc', e.target.value)}
                defaultValue={currentItem.desc}
              />
            </FloatingLabel>

            <ToggleButtonGroup
              type="radio"
              name="options"
              className="w-100 mb-2"
              defaultValue={currentItem.urgency}
            >
              <ToggleButton
                value="first"
                id="tbg-btn-4"
                variant="outline-danger"
                onChange={(e) => setValueInFields('urgency', e.target.value)}
              >
                First
              </ToggleButton>
              <ToggleButton
                value="next"
                id="tbg-btn-5"
                variant="outline-warning"
                onChange={(e) => setValueInFields('urgency', e.target.value)}
              >
                Next
              </ToggleButton>
              <ToggleButton
                value="later"
                id="tbg-btn-6"
                variant="outline-success"
                onChange={(e) => setValueInFields('urgency', e.target.value)}
              >
                Later
              </ToggleButton>
            </ToggleButtonGroup>

            <FloatingLabel label="Due date" className="mb-2">
              <Form.Control
                type="date"
                placeholder=""
                style={{ height: '50px' }}
                onInput={(e) => setValueInFields('due', e.target.value)}
                defaultValue={new Date(currentItem.due).toLocaleDateString('en-CA')}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
