import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/home";

import { ColaboradorHome } from "@/pages/colaborador/home";
import { ColaboradorEvolution } from "@/pages/colaborador/evolution";
import { EvaluationBasePage} from "@/pages/colaborador/evaluation/base.tsx";

import { Import } from "@/pages/rh/Import";
import { EvaluationCriteria } from "@/pages/rh/EvaluationCriteria";
import { RhDashboard } from "@/pages/rh/Dashboard";
import { RhCollaborator } from "@/pages/rh/Collaborator";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* colaboradores */}
        <Route path="/colaborador/home" element={<ColaboradorHome />} />
        <Route path="/colaborador/evolution" element={<ColaboradorEvolution />} />
        <Route path="/colaborador/evaluation" element={<EvaluationBasePage />} />
        {/* RH */}
        <Route path="/rh/dashboard" element={<RhDashboard />} />
        <Route path="/rh/collaborators" element={<RhCollaborator />} />
        <Route path="/rh/criteria" element={<EvaluationCriteria />} />
        <Route path="/rh/import" element={<Import />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
