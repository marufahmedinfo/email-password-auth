import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Ragiser from './components/Ragister/Ragiser.jsx';
import Signup from './components/Signup/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/ragiser',
        element: <Ragiser />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
