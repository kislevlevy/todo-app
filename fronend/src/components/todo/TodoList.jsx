// Imports:
import React, { useContext } from 'react';

import TodoItem from './TodoItem';
import TodoContext from '../../context/TodoProvider';
import ThemeContext from '../../context/ThemeProvider';

import { Accordion } from 'react-bootstrap';

///////////////////////////////////////////////////
// Component:
export default function TodoList() {
  // Component veriables:
  const { filterdArr } = useContext(TodoContext);
  const { themeValue } = useContext(ThemeContext);

  // Component return HTML:
  return (
    <Accordion
      defaultActiveKey="0"
      className="m-2"
      alwaysOpen
      data-bs-theme={themeValue}
    >
      {filterdArr &&
        filterdArr
          .sort((a, b) => new Date(a.due) - new Date(b.due))
          .map((todoItem) => <TodoItem key={todoItem._id} todoItem={todoItem} />)}
    </Accordion>
  );
}
