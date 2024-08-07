import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "../src/pages/Login";
import LandPage from "../src/pages/LandPage";
import RecipeForm from "../src/pages/AddFood";
import VideoPlayer from "../src/pages/Player";
import Detail from "../src/pages/Detail";
import Elevation from "../src/pages/AllFood";
import Register from "../src/pages/Register";
import OpenAi from "../src/pages/OpenAi";

const loader = () => {
    if (!localStorage.access_token) {
      return redirect('/login')
    }
    return null
  }

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandPage/>,
    loader : loader
  },
  {
    path : '/register',
    element : <Register/>
  },
  {
    path :'/login',
    element : <Login/>
  },
  {
    path : '/foods',
    element : <RecipeForm/>,
    loader : loader
  },
  {
    path : '/foods/:id',
    element : <Detail/>,
    loader : loader
  },
  {
    path :'/home',
    element : <Elevation/>,
    loader : loader
  },
  {
    path :'/openai',
    element : <OpenAi/>,
    loader : loader
  }
  
]);

export default router