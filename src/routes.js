import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import submitQualm from './submitQualm';
//finished base imports


//Extra Pages
import jsonfile from "./TestJSON.json";
import PrivateRoute from "./auth/PrivateRoute";

// const routes = [ // without auth
const routes = () => [ 
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    // element: <MainLayout />, // without auth
    children: [
      { path: 'landing', element: <Landing/>},
      //login and register
      { path: 'login', element: <Login /> },
      { path: 'logout', element: <Logout/> },
      { path: 'register', element: <RegisterView /> },

      // Other pages
      { path: 'getcontrollersJSON', element: <jsonfile /> },

      //page not found and root with redirect to dashboard.
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: isLoggedIn ? <Navigate to = "/app/dashboard"/> :<Landing/> },
      // { path: '/', element: <Navigate to = "/app/dashboard"/> }, // without auth
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
