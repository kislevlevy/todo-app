// Imports:
import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

///////////////////////////////////////////////////
// Component:
export default function Navigation({ setThemeValue, themeValue }) {
  return (
    <Navbar
      className="bg-body-tertiary rounded mt-3"
      data-bs-theme={themeValue}
    >
      <Container>
        <Navbar.Brand href="#">
          Todo List App
          <br />
          Bootstrap/React App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="m-2">
            <ToggleButtonGroup
              onChange={setThemeValue}
              type="radio"
              name="options"
              defaultValue="light"
            >
              <ToggleButton id="tbg-radio-2" value="light" variant="light">
                ☀️
              </ToggleButton>
              <ToggleButton id="tbg-radio-1" value="dark" variant="dark">
                🌙
              </ToggleButton>
            </ToggleButtonGroup>
          </Navbar.Text>
          <Navbar.Text className="m-2">
            Made By: <a href="https://github.com/kislevlevy">Kislev Levy</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
