import { createContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./Components";
import ConfigProvider from "./Contexts/ConfigContext";
import "./App.css";

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loadingState: boolean) => {},
});

function App() {
  return (
    <ConfigProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={"<Home />"} />
        </Routes>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
