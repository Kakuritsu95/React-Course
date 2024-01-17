import { useState } from "react";
import styled from "styled-components";
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: red;
`;
const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin: 20px;
`;
const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 2rem;
  width: 150px;
  font-size: 1.5rem;
`;
const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;
function App() {
  const a = 5;
  return (
    <StyledApp>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert("heeeeeheXD")}>Check in</Button>
      <Button onClick={() => alert("heeeeeheXD")}>Check out</Button>
      <Input type="number" placeholder="number of guests" min="0" max="10" />
    </StyledApp>
  );
}

export default App;
