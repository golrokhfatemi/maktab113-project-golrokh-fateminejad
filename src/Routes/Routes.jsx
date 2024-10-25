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
import FinalizeCartPage from "../Pages/FinalizeCartPage";
import PaymentPage from "../Pages/PaymentPage";
import PaymentSuccessPage from "../Pages/PaymentSuccessPage";
import PaymentFailPage from "../Pages/PaymentFailPage";
import UserRegisterPage from "../Pages/userRegisterPage";





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
        path: "/products/:id",
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
      {
        path: "finalcartconfirm",
        element: <FinalizeCartPage />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "payment-fail",
        element: <PaymentFailPage />,
      },
      
    ],
  },
  {
    path: "/user-login",
    element:<UserLoginPage/>,
  },
  {
    path: "/user-register",
    element:<UserRegisterPage/>,
  },
  {
    path: "/payment",
    element:<PaymentPage/>,
  }
]);
  

export const AppRoute = () =>{
  return <RouterProvider router={router}/>
}





