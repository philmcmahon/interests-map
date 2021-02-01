import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Router from "./Router";

const StyledApp = styled.main`
  width: 100%;
  height: 300px;
`;

const App = () => (
  <StyledApp>
    <Router />
  </StyledApp>
);

render(<App />, document.getElementById("root"));
