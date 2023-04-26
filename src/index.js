import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import allPokes from './routes/allPokes.js';
import pokeDetail from './routes/pokeDetail.js';
import pokeDetailPlus from './routes/pokeDetailPlus.js';
import reportWebVitals from './reportWebVitals.js';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <allPokes />,
    children: [
      {
        path: "/pokemon/:id",
        element: <pokeDetail />,
      },
      {
        path: "/pokemon/:id/:info",
        element: <pokeDetailPlus />,
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
