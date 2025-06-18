import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Home } from '../pages/home'
import  ColaboradorHome  from '../pages/colaborador/home/index.tsx'
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="colaborador/home" element={<ColaboradorHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes