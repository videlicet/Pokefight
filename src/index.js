import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllPokes from './routes/AllPokes.js';
import PokeDetail from './routes/PokeDetail.js';
import PokeDetailPlus from './routes/PokeDetailPlus.js';
import reportWebVitals from './reportWebVitals.js';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllPokes />,
    children: [
      {
        path: "/pokemon/:id",
        element: <PokeDetail />,
      },
      {
        path: "/pokemon/:id/:info",
        element: <PokeDetailPlus />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
