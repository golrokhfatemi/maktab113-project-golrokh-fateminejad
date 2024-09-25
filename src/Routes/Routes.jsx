import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/HomePage";

import AboutUs from "../Pages/AboutUs";
import ContactUsPage from "../Pages/ContactUsPage";
import PanelAdminPage from "../Pages/Dashboard/PanelAdminPage";
import AdminLoginPage from "../Pages/AdminLoginPage";
import UserLoginPage from "../Pages/UserLoginPage";
import ProtectedRoute from "../Components/ProtectedRout";
import SingleProductPage from "../Pages/SingleProductPage";





const router = createBrowserRouter([
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },
  {
    path: "/panel-admin",
    element:
    <ProtectedRoute>
       <PanelAdminPage/>
    </ProtectedRoute>
     
    
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <SingleProductPage />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contactus",
        element: <ContactUsPage />,
      },
    ],
  },
  {
    path: "/user-login",
    element:<UserLoginPage/>,
  },
]);
  

export const AppRoute = () =>{
  return <RouterProvider router={router}/>
}





