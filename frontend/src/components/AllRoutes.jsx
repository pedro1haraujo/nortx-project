import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Error404 } from "../pages/Error404";
import { Login } from "../pages/Login";
import { RequireAuth } from "./RequireAuth";
import { Dashboard } from "../pages/Dashboard";
import { Empresas } from "../pages/Empresas";
import { Empresa } from "../pages/Empresa";
import { Agendas } from "../pages/Agendas";
import { Agenda } from "../pages/Agenda";
import { Lembretes } from "../pages/Lembretes";


export const AllRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />

          <Route path="/empresas" element={<RequireAuth><Empresas /></RequireAuth>} />
          <Route path="/empresas/:id" element={<RequireAuth><Empresa /></RequireAuth>} />
          <Route path="/empresas/create" element={<RequireAuth><Empresa /></RequireAuth>} />

          <Route path="/agendas" element={<RequireAuth><Agendas /></RequireAuth>} />
          <Route path="/agendas/:id" element={<RequireAuth><Agenda /></RequireAuth>} />
          <Route path="/agendas/create" element={<RequireAuth><Agenda /></RequireAuth>} />

          <Route path="/lembretes" element={<RequireAuth><Lembretes /></RequireAuth>} />

          <Route path="/demandas" element={<RequireAuth><Dashboard /></RequireAuth>} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    );
  };

