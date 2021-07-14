import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "../Appointment/index";

afterEach(cleanup);

describe("Appointment", () => {
  xit("render without crashing", () => {
    render(<Appointment />);
  });
});