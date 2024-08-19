// Imports:
import React, { useCallback, useContext, useEffect, useState } from 'react';

import ThemeContext from '../../context/ThemeProvider';
import TodoContext from '../../context/TodoProvider';

import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Form,
  ButtonGroup,
  Container,
} from 'react-bootstrap';

///////////////////////////////////////////////////
// Coponent:
export default function FormFilter() {
  // State veriables:
  const { themeValue } = useContext(ThemeContext);
  const { setFilterdArr, todoArr } = useContext(TodoContext);

  const [ugencyArr, setUrgencyArr] = useState(['first', 'next', 'later']);
  const [isCompleted, setIsCompleted] = useState(false);

  const filterTasks = useCallback(() => {
    let arr = todoArr;

    !isCompleted && (arr = arr.filter((ele) => !ele.isCompleted));
    arr = arr.filter((ele) => ugencyArr.includes(ele.urgency));

    setFilterdArr(arr);
  }, [todoArr, isCompleted, ugencyArr, setFilterdArr]);

  useEffect(() => {
    todoArr && filterTasks();
  }, [todoArr, filterTasks]);

  // Return HTML:
  return (
    <Container className="m-2" data-bs-theme={themeValue}>
      <Form.Label>Filters:</Form.Label>
      <ToggleButtonGroup
        type="checkbox"
        defaultValue={['first', 'next', 'later']}
        className="mb-2 w-100"
        onChange={setUrgencyArr}
      >
        <ToggleButton id="tbg-check-1" value="first" variant="outline-danger">
          First
        </ToggleButton>
        <ToggleButton id="tbg-check-2" value="next" variant="outline-warning">
          Next
        </ToggleButton>
        <ToggleButton id="tbg-check-3" value="later" variant="outline-success">
          Later
        </ToggleButton>
      </ToggleButtonGroup>
      <ButtonGroup className="w-100">
        <ToggleButton
          onChange={(e) => {
            setIsCompleted(e.currentTarget.checked);
          }}
          type="checkbox"
          checked={isCompleted}
          id="is-completed"
        >
          Show compleated tasks
        </ToggleButton>
      </ButtonGroup>
    </Container>
  );
}
