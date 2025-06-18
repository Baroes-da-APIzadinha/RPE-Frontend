import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";
import { Import } from "@/pages/rh/Import";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rh/import" element={<Import />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
