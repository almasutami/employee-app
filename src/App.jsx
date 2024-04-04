import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import EmployeeList from "./pages/employee-list.tsx";
// import EmployeeDetails from "~/pages/employee-details";
// import MyNavbar from "~/components/my-navbar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {/* <MyNavbar /> */}
        <Routes>
          <Route element={<EmployeeList />} path="/" />
          {/* <Route element={<EmployeeDetails />} path="/employees/:employee_id" /> */}
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
