import { Container } from "./styles";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/page-title";

export const Error404 = () => {
  usePageTitle("404 - Página não encontrada");

  return (
    <Container>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>
        A página que você está tentando acessar não existe ou foi removida.
      </p>
      <p>
        <Link to="/">Voltar para a página inicial</Link>
      </p>
    </Container>
  );
}
