import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/01-HomePage'
import LoginPage from './pages/03-LoginPage'
import RegisterPage from './pages/02-RegisterPage'
import CompanyPage from './pages/04-CompanyPage'
import AdminPage from './pages/05-AdminPage'


function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/company' element={<CompanyPage />} />
      <Route path='/admin' element={<AdminPage/>} />
    </Routes>
  )
}

export default App
