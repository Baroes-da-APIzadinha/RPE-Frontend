import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";

import { ColaboradorHome } from "@/pages/colaborador/home";
import { ColaboradorEvolution } from "@/pages/colaborador/evolution";
import { EvaluationBasePage } from "@/pages/colaborador/evaluation/base.tsx";

import { Import } from "@/pages/rh/Import";
import { EvaluationCriteria } from "@/pages/rh/EvaluationCriteria";
import { RhDashboard } from "@/pages/rh/Dashboard";
import { RhCollaborator } from "@/pages/rh/Collaborator";
import { CycleHistory } from "@/pages/comite/CycleHistory";
import { MananegerDashboard } from "@/pages/manager/Dashboard";
import { ManagerTeam } from "@/pages/manager/Team";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import { CollaboratorEqualization } from "@/pages/comite/CollaboratorEqualization";
import { CollaboratorReview } from "@/pages/manager/CollaboratorReview";
import { BaseLayout } from "@/components/BaseLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
        
          {/* colaboradores */}
          <Route path="/colaborador" element={<BaseLayout />}>
            <Route path="home" element={<ColaboradorHome />} />
            <Route path="evolution" element={<ColaboradorEvolution />} />
            <Route path="evaluation" element={<EvaluationBasePage />} />
          </Route>

          {/* Gestor */}
          <Route path="/gestor" element={<BaseLayout />}>
            <Route path="dashboard" element={<MananegerDashboard />} />
            <Route path="team" element={<ManagerTeam />} />
            <Route
              path="collaborator/review"
              element={<CollaboratorReview />}
            />
          </Route>

          {/* RH */}
          <Route path="/rh" element={<BaseLayout />}>
            <Route path="dashboard" element={<RhDashboard />} />
            <Route path="collaborators" element={<RhCollaborator />} />
            <Route path="criteria" element={<EvaluationCriteria />} />
            <Route path="import" element={<Import />} />
          </Route>

          {/* Comitê */}
          <Route path="/comite" element={<BaseLayout />}>
            <Route path="equalization" element={<CollaboratorEqualization />} />
            <Route path="history" element={<CycleHistory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
