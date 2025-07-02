import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";

import PublicRoute from "./publicRoute";
import ProtectedRoute from "./protectedRoute";
import { BaseLayout } from "@/components/BaseLayout";

import { ColaboradorHome } from "@/pages/colaborador/home";
import { ColaboradorEvolution } from "@/pages/colaborador/evolution";
import { EvaluationBasePage } from "@/pages/colaborador/evaluation/base.tsx";

import { Import } from "@/pages/rh/Import";
import { EvaluationCriteria } from "@/pages/rh/EvaluationCriteria";
import { RhDashboard } from "@/pages/rh/Dashboard";
import { RhCollaborator } from "@/pages/rh/Collaborator";

import { CollaboratorReview } from "@/pages/manager/CollaboratorReview";
import { MananegerDashboard } from "@/pages/manager/Dashboard";
import { ManagerTeam } from "@/pages/manager/Team";

import { CycleHistory } from "@/pages/comite/CycleHistory";

import RhCyclePage from '@/pages/rh/cycle';
import CycleCriteriaPage from '@/pages/rh/cycleCriteria';

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
        
          <Route element={<BaseLayout />}>
          
            {/* colaboradores */}
            <Route path="/colaborador" >
              <Route path="home" element={<ColaboradorHome />} />
              <Route path="evolution" element={<ColaboradorEvolution />} />
              <Route path="evaluation" element={<EvaluationBasePage />} />
            </Route>

            {/* Gestor */}
            <Route path="/gestor" >
              <Route path="dashboard" element={<MananegerDashboard />} />
              <Route path="team" element={<ManagerTeam />} />
              <Route path="collaborator/review" element={<CollaboratorReview />}
              />
            </Route>

            {/* RH */}
            <Route path="/rh" >
              <Route path="dashboard" element={<RhDashboard />} />
              <Route path="collaborators" element={<RhCollaborator />} />
              <Route path="criteria" element={<EvaluationCriteria />} />
              <Route path="import" element={<Import />} />
              <Route path="cycle" element={<RhCyclePage />} />
              <Route path="cycle/criteria" element={<CycleCriteriaPage />} />
            </Route>

            {/* Comitê */}
            <Route path="/comite" >
              <Route path="equalization" element={<CollaboratorEqualization />} />
              <Route path="history" element={<CycleHistory />} />
            </Route>

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
