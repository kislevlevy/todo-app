// Imports:
import React, { useContext, useEffect, useState } from 'react';

import ThemeContext from '../../context/ThemeProvider';
import TodoContext from '../../context/TodoProvider';
import AuthContext from '../../context/AuthProvider';

import {
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  FloatingLabel,
  Form,
  InputGroup,
} from 'react-bootstrap';

///////////////////////////////////////////////////
// Component:
export default function RegisterModal() {
  // Component state veriables:
  const { themeValue } = useContext(ThemeContext);
  const { isRegistering, setIsRegistering, setCurrentUser } =
    useContext(TodoContext);
  const { register } = useContext(AuthContext);

  const [fields, setFields] = useState({});
  const [show, setShow] = useState(false);

  // Component functions:
  const setValueInFields = (e) =>
    setFields((oldObj) => ({ ...oldObj, [e.target.name]: e.target.value }));

  const handleClose = () => {
    setShow(false);
    setIsRegistering(false);
  };

  const handleRegister = function (e) {
    e.preventDefault();
    register(fields, setCurrentUser);
    handleClose();

    setFields({});
  };

  useEffect(() => {
    if (isRegistering) setShow(true);
  }, [isRegistering]);

  // Component HTML return:
  if (isRegistering)
    return (
      <Modal show={show} onHide={handleClose} data-bs-theme={themeValue}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white">Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="task-form-register" className="m-2" data-bs-theme={themeValue}>
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={fields.name || ''}
                onChange={setValueInFields}
              />
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                name="userName"
                value={fields.userName || ''}
                onChange={setValueInFields}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text>✉️</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={fields.email || ''}
                onChange={setValueInFields}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>🔑</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={fields.password || ''}
                onChange={setValueInFields}
              />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={fields.passwordConfirm || ''}
                onChange={setValueInFields}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register Now!
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
