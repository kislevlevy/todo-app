// Imports:
import React, { useContext, useEffect, useState } from 'react';

import ThemeContext from '../../context/ThemeProvider';

import {
  Container,
  Form,
  Nav,
  Navbar,
  FloatingLabel,
  ToggleButton,
  ToggleButtonGroup,
  InputGroup,
  Button,
  Col,
  Row,
  Offcanvas,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import AuthContext from '../../context/AuthProvider';
import TodoContext from '../../context/TodoProvider';

///////////////////////////////////////////////////
// Component:
export default function Navigation() {
  // component veriables:
  const { setThemeValue, themeValue } = useContext(ThemeContext);
  const { login, logout } = useContext(AuthContext);
  const { currentUser, setCurrentUser, setIsRegistering, setTodoArr } =
    useContext(TodoContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, setCurrentUser);

    setEmail('');
    setPassword('');
  };
  const handleLogout = (e) => {
    logout(setCurrentUser);
    setTodoArr([]);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistering(true);
  };

  // Return component HTML:
  return (
    <Navbar
      className="bg-body-tertiary rounded mt-3"
      collapseOnSelect
      expand="xs"
      data-bs-theme={themeValue}
    >
      <Container>
        <Navbar.Brand href="#">
          Todo List App
          <br />
          Bootstrap/React App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id="responsive-navbar-nav"
          placement="end"
          data-bs-theme={themeValue}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Item className="m-3">
                <ToggleButtonGroup
                  onChange={setThemeValue}
                  type="radio"
                  name="options"
                  defaultValue="light"
                  className="w-100"
                >
                  <ToggleButton id="tbg-radio-2" value="light" variant="light">
                    ☀️
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-1" value="dark" variant="dark">
                    🌙
                  </ToggleButton>
                </ToggleButtonGroup>
              </Nav.Item>
            </Nav>
            <Nav className="ms-auto">
              {currentUser ? (
                <Nav.Item className="m-3">
                  <NavDropdown
                    title={
                      <div className="bg-body-secondary rounded">
                        <Image
                          thumbnail
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/50px-User-avatar.svg.png"
                        />
                        <span className="ms-2">@{currentUser.userName}</span>
                      </div>
                    }
                  >
                    <NavDropdown.Header>User Panel:</NavDropdown.Header>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText>
                      <h5>{currentUser.name}</h5>
                      <h6>{currentUser.email}</h6>
                    </NavDropdown.ItemText>
                    <NavDropdown.ItemText>
                      <Button
                        onClick={handleLogout}
                        className="w-50"
                        variant="outline-danger"
                      >
                        Logout
                      </Button>
                      <Button className="w-50" variant="outline-danger">
                        Delete account
                      </Button>
                    </NavDropdown.ItemText>
                  </NavDropdown>
                </Nav.Item>
              ) : (
                <Nav.Item className="m-3">
                  <Form onSubmit={handleLogin}>
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputGroup.Text id="basic-addon2">#</InputGroup.Text>

                      <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button type="submit">Login</Button>
                    </InputGroup>
                  </Form>
                  <br />
                  Already registered?{' '}
                  <a href="/" onClick={handleRegister}>
                    Register Now!
                  </a>
                </Nav.Item>
              )}
            </Nav>
            <Nav className="flex-row align-items-center">
              <Nav.Item className="m-3">
                Made By <a href="https://github.com/kislevlevy">Kislev Levy</a>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
