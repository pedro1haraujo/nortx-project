import { useEffect, useState } from "react";
import * as Styles from "./styles";
import logoImg from "../../assets/images/logo.png";
import { usePageTitle } from "../../hooks/page-title";

export const Navbar = ({ expanded, updateExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const appName = import.meta.env.VITE_APP_NAME;

  const [loggingOut, setLoggingOut] = useState(false);

  usePageTitle("Home");

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    updateExpanded(isExpanded);
  }, [isExpanded, updateExpanded]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
      setLoggingOut(false);
    }, 300);
  }

  return (
    <Styles.Container id="navbar" className={isExpanded ? "navbar-expanded" : ""}>
      <Styles.ToggleIcon
        id="navbar-toggle-icon"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <i
          className={`fa fa-chevron-${isExpanded ? "left" : "right"}`}
        ></i>
      </Styles.ToggleIcon>
      <Styles.LogoContainer to="/" title={appName}>
        <img src={logoImg} alt={appName} />
      </Styles.LogoContainer>
      <Styles.NavList>
        <Styles.NavItem>
          <Styles.NavLink to="/empresas/create" title="Adicionar empresa">
            <i className="fa fa-plus-circle"></i>
            <span>Adicionar empresa</span>
          </Styles.NavLink>
        </Styles.NavItem>
        <Styles.NavItem>
          <Styles.NavLink to="/empresas" title="Todas Empresas">
            <i className="fa fa-building"></i>
            <span>Todas as Empresas</span>
          </Styles.NavLink>
        </Styles.NavItem>
        <Styles.NavItem>
          <Styles.NavLink to="/agendas" title="Agenda">
            <i className="fa fa-calendar-minus"></i>
            <span>Agenda</span>
          </Styles.NavLink>
        </Styles.NavItem>
        <Styles.NavItem>
          <Styles.NavLink to="/lembretes" title="Lembretes">
            <i className="fa fa-bell"></i>
            <span>Lembretes</span>
          </Styles.NavLink>
        </Styles.NavItem>
        <Styles.NavItem>
          <Styles.NavLink to="/demandas" title="Demandas">
            <i className="fa fa-list-check"></i>
            <span>Demandas</span>
          </Styles.NavLink>
        </Styles.NavItem>
      </Styles.NavList>
      <Styles.NavListBottom>
        <Styles.NavItem>
          <Styles.NavLink
            to="#"
            title="Sair"
            disabled={loggingOut}
            onClick={handleLogout}
          >
            <i
              className={`fa ${loggingOut? 'fa-spinner fa-spin': 'fa-sign-out-alt'}`}
            ></i>
          </Styles.NavLink>
        </Styles.NavItem>
      </Styles.NavListBottom>
    </Styles.Container>
  );
}
