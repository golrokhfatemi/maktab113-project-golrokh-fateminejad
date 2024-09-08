import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import AboutUs from "../Pages/AboutUs";
import ContactUsPage from "./ContactUsPage";

const router = createBrowserRouter([
  {
    path :"/",
    element :<Layout/>,
    children :[
      {
        index : true ,
        element : <HomePage/>
      },
      {
        path :"/aboutus",
        element : <AboutUs/>
      },
      {
        path :"/contactus",
        element :<ContactUsPage/>
      }
    ]
  },
  {
    path:"/login",
    element:<LoginPage/>
  }
])
export const AppRoute = () =>{
  return <RouterProvider router={router}/>
}