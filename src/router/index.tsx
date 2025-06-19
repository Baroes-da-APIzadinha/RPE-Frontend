import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/home";
import { Import } from "@/pages/rh/Import";

import { ColaboradorHome } from "@/pages/colaborador/home";
import { ColaboradorEvolution } from "@/pages/colaborador/evolution";
import { ColaboradorEvaluation} from "@/pages/colaborador/evaluation/autoevaluation";

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
        <Route path="colaborador/evaluation" element={<ColaboradorEvaluation />} />
        <Route path="/rh/import" element={<Import />} />
        {/* <Route path="/rh/criteria" element={<EvaluationCriteria />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
