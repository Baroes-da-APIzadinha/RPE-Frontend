import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/home";
import { Import } from "@/pages/rh/Import";

import { ColaboradorHome } from "@/pages/colaborador/home";
import { ColaboradorEvolution } from "@/pages/colaborador/evolution";
import { EvaluationBasePage} from "@/pages/colaborador/evaluation/base.tsx";

// import { EvaluationCriteria } from "@/pages/rh/EvaluationCriteria";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* colaboradores */}
        <Route path="colaborador/home" element={<ColaboradorHome />} />
        <Route path="colaborador/evolution" element={<ColaboradorEvolution />} />
        <Route path="colaborador/evaluation" element={<EvaluationBasePage />} />
        <Route path="/rh/import" element={<Import />} />
        {/* <Route path="/rh/criteria" element={<EvaluationCriteria />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
