import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/01-HomePage'
import LoginPage from './pages/03-LoginPage'
import RegisterPage from './pages/02-RegisterPage'
import CompanyPage from './pages/04-CompanyPage'
import AdminPage from './pages/05-AdminPage'
import EmployeePage from './pages/06-EmployeePage'
import Error404 from './pages/07-Error404'
import MembershipUpdate from './pages/08-MembershipUpdate'
import { EmployeeAuthentication } from './components/protectedRoutes/EmployeeAuthentication'
import { CompanyAuthentication } from './components/protectedRoutes/CompanyAuthentication'
import { AdminAuthentication } from './components/protectedRoutes/AdminAuthentication'
import { MembershipAuthentication } from './components/protectedRoutes/MembershipAuthentication'
import { LoginAuthentication } from './components/protectedRoutes/LoginAuthentication'
import { Redirect } from './components/RedirectPage'

function App() {

  return (
    <Routes>

      <Route path='*' element={<Error404 />} />
      <Route path='/error' element={<Error404 />} />

      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />


      <Route path='/login' element={<LoginAuthentication />}>
        <Route path='' element={<LoginPage />} />
      </Route>


      <Route path='/company' element={<CompanyAuthentication />}>
        <Route path='' element={<CompanyPage />} />
      </Route>

      <Route path='/admin' element={<AdminAuthentication />}>
        <Route path='' element={<AdminPage />} />
      </Route>

      <Route path='/employee' element={<EmployeeAuthentication />}>
        <Route path='' element={<EmployeePage />} />
      </Route>

      <Route path='/membershipUpdate' element={<MembershipAuthentication />}>
        <Route path='' element={<MembershipUpdate />} />
      </Route>

      <Route path='/redirect' element={<Redirect />} />
    </Routes>
  )
}

export default App
