import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import EmployeeList from "./pages/employee-list.tsx";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<EmployeeList />} path="/" />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
