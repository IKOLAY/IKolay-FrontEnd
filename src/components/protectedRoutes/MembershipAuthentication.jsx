import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function MembershipAuthentication(){
  const role = localStorage.getItem("role"); 
  if(role!="MANAGER")
  return <Navigate to="/error"/>

  const company = JSON.parse(localStorage.getItem("company"));
  const now = Date.now();
  const expDate = new Date(company.membershipExpiration).getTime();
  
return Math.ceil((expDate - now) / (1000 * 60 * 60 * 24)) < 8  ? <Outlet/> : <Navigate to="/error"/>
}