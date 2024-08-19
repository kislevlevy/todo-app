// Imports:
import React, { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Container, Row, Col } from 'react-bootstrap';

import Form from './components/form/Form';
import TodoList from './components/todo/TodoList';
import EditModal from './components/modal/EditModal';

import ThemeContext from './context/ThemeProvider';
import { TodoProvider } from './context/TodoProvider';
import { AuthProvider } from './context/AuthProvider';
import Navigation from './components/nav/Navigation';
import RegisterModal from './components/modal/RegisterModal';

///////////////////////////////////////////////////
// Component:
export default function App() {
  // Veriables
  const { themeValue } = useContext(ThemeContext);

  // Component return HTML:
  return (
    <TodoProvider>
      <EditModal />
      <AuthProvider>
        <RegisterModal />
      </AuthProvider>
      <Container
        style={{
          backgroundColor: themeValue === 'dark' && 'darkgrey',
          borderRadius: '15px',
        }}
      >
        <Row>
          <Col>
            <AuthProvider>
              <Navigation />
            </AuthProvider>
          </Col>
        </Row>
        <Row>
          <Col className="col-lg-4 col-md-6 col-12">
            <Form />
          </Col>
          <Col>
            <TodoList />
          </Col>
        </Row>
      </Container>
    </TodoProvider>
  );
}
