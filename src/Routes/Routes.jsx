import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/HomePage";

import AboutUs from "../Pages/AboutUs";
import ContactUsPage from "../Pages/ContactUsPage";
import PanelAdminPage from "../Pages/Dashboard/PanelAdminPage";
import AdminLoginPage from "../Pages/AdminLoginPage";
import UserLoginPage from "../Pages/UserLoginPage";
import ProtectedRoute from "../Components/ProtectedRout";





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



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

