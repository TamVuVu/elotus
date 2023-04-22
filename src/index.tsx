import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./Store";
import { MoviesDetails, NowPlaying, TopRated } from "./Pages";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "now-playing",
        element: <NowPlaying />,
        index: true,
      },
      {
        path: "movies/:movieId",
        element: <MoviesDetails />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 NOT FOUND</h1>,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
