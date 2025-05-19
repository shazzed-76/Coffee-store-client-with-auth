import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./Components/MainLayout.jsx";
import Home from "./Components/Home.jsx";
import SingleCoffee from "./Components/SingleCoffee.jsx";
import UpdateCoffeeInfo from "./Components/UpdateCoffeeInfo.jsx";
import AddCoffee from "./Components/AddCoffee.jsx";
import CoffeeProvider from "./Context/CoffeeProvider.jsx";
import AuthProvider from "./Firebase/AuthProvider.jsx";
import SignUp from "./Components/SignUp.jsx";
import Users from "./Components/Users.jsx";
import SignIn from "./Components/SignIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },

      {
        path: "add-coffee",
        element: <AddCoffee />,
      },

      {
        path: "single-coffee/:id",
        loader: ({ params }) =>
          fetch(`https://coffee-store-server-with-auth-sooty.vercel.app/coffees/${params.id}`),
        element: <SingleCoffee />,
        hydrateFallbackElement: <p>Loading.....</p>,
      },
      {
        path: "update-coffee-info/:id",
        loader: ({ params }) =>
          fetch(`https://coffee-store-server-with-auth-sooty.vercel.app/coffees/${params.id}`),
        element: <UpdateCoffeeInfo />,
        hydrateFallbackElement: <p>Loading.....</p>,
      },
      {
        path: "users",
        loader: () => fetch("https://coffee-store-server-with-auth-sooty.vercel.app/users"),
        element: <Users />,
        hydrateFallbackElement: <p>Loading.....</p>,
      },
      {
        path: "SignUp-user",
        element: <SignUp />,
      },

      {
        path: "signIn",
        element: <SignIn />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CoffeeProvider>
        <RouterProvider router={router} />
      </CoffeeProvider>
    </AuthProvider>
  </StrictMode>
);
