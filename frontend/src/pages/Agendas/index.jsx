import * as Styles from "./styles"
import { Layout } from "../../components/Layout";
import { usePageTitle } from "../../hooks/page-title";
import { useEffect, useState } from "react";
import { BoxAgenda } from "../../components/BoxAgenda";
import { useNavigate } from "react-router-dom";
import { useAgenda } from "../../hooks/agenda";

export const Agendas = () => {
  usePageTitle("Agenda");

  const navigate = useNavigate();

  const [agendas, setAgendas] = useState([]);

  const { fetchAgenda, isFetching } = useAgenda();

  useEffect(() => {
    fetchAgenda().then((data) => {
      setAgendas(data.eventos);
    }).catch((error) => {
      toast.error(error.message);
    });
  }, []);

  const handleAgendaClick = (agenda) => {
    const agendaIndex = agendas.findIndex((agendaItem) => agendaItem.id === agenda.id);
    if (agendaIndex === -1) {
      return;
    }
    navigate(`/agendas/${agenda.id}`);
  }

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <Styles.Header>
            Agenda
            <Styles.CreateButton to="/agendas/create">
              Criar novo evento
            </Styles.CreateButton>
          </Styles.Header>
          <Styles.Body>
            {isFetching? (
              <p>Carregando...</p>
            ): null}
            {agendas.length === 0 && !isFetching? (
              <p>Nenhum evento encontrado.</p>
            ): null}
            {agendas.length? agendas.map((agenda) => (
              <BoxAgenda
                key={`agenda-${agenda.id}`}
                agenda={agenda}
                onClick={() => handleAgendaClick(agenda)}
              />
            )): null}
          </Styles.Body>
        </Styles.Content>
      </Styles.Container>
    </Layout>
  );
}
