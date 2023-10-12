import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function LoginAuthentication(){
    const role = localStorage.getItem("role");     
  return (role==null)  ? <Outlet/> : <Navigate to="/"/>
  }