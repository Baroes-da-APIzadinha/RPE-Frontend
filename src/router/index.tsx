import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/home";
import { Import } from "@/pages/rh/Import";
import { ColaboradorHome } from "@/pages/colaborador/home";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="colaborador/home" element={<ColaboradorHome />} />
        <Route path="/rh/import" element={<Import />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
