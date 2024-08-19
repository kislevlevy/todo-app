// Imports:
import React, { useContext } from 'react';
import TodoContext from '../../context/TodoProvider';

import { Accordion, Card, Button, ButtonGroup } from 'react-bootstrap';

///////////////////////////////////////////////////
// Component:
export default function TodoItem({ todoItem }) {
  // Component state veriables:
  const { setIsEditing, markCompleted, deleteItem } = useContext(TodoContext);
  const urgency = {
    first: '🔴',
    next: '🟡',
    later: '🟢',
  };

  // Component HTML return:
  return (
    <Accordion.Item eventKey={todoItem._id}>
      <Accordion.Header
        style={{ textDecorationLine: todoItem.isCompleted && 'line-through' }}
      >
        <span>{urgency[todoItem.urgency]}&#160;</span>
        {todoItem.title}
      </Accordion.Header>
      <Accordion.Body>
        <Card className="text-center">
          <Card.Header>
            Due - {new Date(todoItem.due).toLocaleDateString('HEB')}
          </Card.Header>
          <Card.Body>
            <Card.Title>{todoItem.title}</Card.Title>
            <Card.Text>{todoItem.desc}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <ButtonGroup>
              <Button
                onClick={() => markCompleted(todoItem._id, todoItem.isCompleted)}
                variant="success"
              >
                {!todoItem.isCompleted ? 'Mark as completed' : 'Mark as uncompleted'}
              </Button>
              <Button onClick={() => setIsEditing(todoItem._id)} variant="primary">
                ✏️
              </Button>
              <Button onClick={() => deleteItem(todoItem._id)} variant="danger">
                🗑️
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Accordion.Body>
    </Accordion.Item>
  );
}
