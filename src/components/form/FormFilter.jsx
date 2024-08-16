// Imports:
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";

///////////////////////////////////////////////////
// Coponent:
export default function FormFilter({
  themeValue,
  todoArr,
  setFilterdArr,
  setTodoArr,
}) {
  const [ugencyArr, setUrgencyArr] = useState(["first", "next", "later"]);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetApp = function () {
    localStorage.removeItem("todo-list");
    setTodoArr([]);
    setFilterdArr([]);
  };
  useEffect(() => {
    let arr = todoArr;
    if (!arr || arr.length < 1) return;

    !isCompleted && (arr = arr.filter((ele) => !ele.isCompleted));
    arr = arr.filter((ele) => ugencyArr.includes(ele.urgency));

    setFilterdArr(arr);
  }, [ugencyArr, setFilterdArr, todoArr, isCompleted]);

  return (
    <Container className="m-2" data-bs-theme={themeValue}>
      <Form.Label>Filters:</Form.Label>
      <ToggleButtonGroup
        type="checkbox"
        defaultValue={["first", "next", "later"]}
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
          onChange={(e) => setIsCompleted(e.currentTarget.checked)}
          type="checkbox"
          checked={isCompleted}
          id="is-completed"
        >
          Show compleated tasks
        </ToggleButton>
        <Button type="click" variant="danger" onClick={resetApp}>
          Reset app
        </Button>
      </ButtonGroup>
    </Container>
  );
}
