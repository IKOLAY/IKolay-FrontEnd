import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function CompanyAuthentication(){
  const role = localStorage.getItem("role"); 
  if(role!="MANAGER")
  return <Navigate to="/error"/>

  const company = JSON.parse(localStorage.getItem("company"));
  const now = Date.now();
  const expDate = new Date(company.membershipExpiration).getTime();
  
return (now-expDate)<0  ? <Outlet/> : <Navigate to="/error"/>
}