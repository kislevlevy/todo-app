// Imports:
import React from "react";

import FormAdd from "./FormAdd";
import FormFilter from "./FormFilter";

import { Container } from "react-bootstrap";

///////////////////////////////////////////////////
// Component:
export default function Form() {
  return (
    <Container>
      <FormAdd />
      <br />
      <FormFilter />
    </Container>
  );
}
