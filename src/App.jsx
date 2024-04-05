import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./redux/reducers/index.tsx";
import "bootstrap/dist/css/bootstrap.css";

import EmployeeList from "./pages/employee-list.tsx";

const App = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<EmployeeList />} path="/" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
