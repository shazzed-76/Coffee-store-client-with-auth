import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './Components/MainLayout.jsx';
import Home from './Components/Home.jsx';
import SingleCoffee from './Components/SingleCoffee.jsx';
import UpdateCoffeeInfo from './Components/UpdateCoffeeInfo.jsx';
import AddCoffee from './Components/AddCoffee.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },

      {
        path: 'add-coffee',
        element: <AddCoffee />
      },

      {
        path: 'single-coffee',
        element: <SingleCoffee />
      }, 
      {
        path: 'update-coffee-info',
        element: <UpdateCoffeeInfo />
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
