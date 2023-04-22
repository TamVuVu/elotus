import { createContext, useReducer } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./Components";
import ConfigProvider from "./Contexts/ConfigContext";
import "./App.css";
import { Alert } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { setErrorMessage } from "./Reducers";

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loadingState: boolean) => {},
});

function App() {
  const { config } = useSelector((state: any) => state);
  const dispatch = useAppDispatch();

  return (
    <ConfigProvider>
      <div className="App">
        <Header />
        {config.errorMessage && (
          <Alert
            type="error"
            message={config.errorMessage}
            closable
            onClose={() => dispatch(setErrorMessage(""))}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-center font-bold">Home </h1>}
          />
        </Routes>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
