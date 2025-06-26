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
import { CycleHistory } from "@/pages/comite/CycleHistory";
import { MananegerDashboard } from "@/pages/manager/Dashboard";
import { ManagerTeam } from "@/pages/manager/Team";
import  ProtectedRoute  from "./protectedRoute";
import PublicRoute from "./publicRoute";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
          <Route
            path="/"
            element={<PublicRoute element={<Login />} />}
          />



        <Route element={<ProtectedRoute />}>
          {/* Rotas protegidas */}
        <Route path="/home" element={<Home />} />

        {/* colaboradores */}
        <Route path="/colaborador/home" element={<ColaboradorHome />} />
        <Route path="/colaborador/evolution" element={<ColaboradorEvolution />} />
        <Route path="/colaborador/evaluation" element={<EvaluationBasePage />} />

        {/* Gestor */}
        <Route path="/gestor/dashboard" element={<MananegerDashboard />} />
        <Route path="/gestor/team" element={<ManagerTeam />} />

        {/* RH */}
        <Route path="/rh/dashboard" element={<RhDashboard />} />
        <Route path="/rh/collaborators" element={<RhCollaborator />} />
        <Route path="/rh/criteria" element={<EvaluationCriteria />} />
        <Route path="/rh/import" element={<Import />} />

        {/* Comitê */}
        <Route path="/comite/history" element={<CycleHistory />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
