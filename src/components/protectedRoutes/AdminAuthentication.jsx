import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function AdminAuthentication(){
    const role = localStorage.getItem("role"); 
  return role == "ADMIN" ? <Outlet/> : <Navigate to="/error"/>
}