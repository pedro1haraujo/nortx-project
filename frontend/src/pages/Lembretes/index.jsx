import * as Styles from "./styles";
import { Layout } from "../../components/Layout";
import { BoxLembrete } from "../../components/BoxLembrete";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../hooks/page-title";
import { useLembretes } from "../../hooks/lembretes";
import { toast } from "react-toastify";

export const Lembretes = () => {
  usePageTitle("Lembretes");

  const { fetchLembretes, isFetching } = useLembretes();

  const [lembretes, setLembretes] = useState([]);

  useEffect(() => {
    fetchLembretes().then((data) => {
      setLembretes(data.lembretes);
    }).catch((error) => {
      toast.error(error.message);
    });
  }, []);

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <Styles.Header>
            <Styles.Title>Lembretes</Styles.Title>
          </Styles.Header>
          <Styles.Body>
            {isFetching && (
              <p>Aguarde! Carregando lembretes...</p>
            )}
            {!isFetching && lembretes.length === 0? (
              <p>Nenhum lembrete cadastrado.</p>
            ): null}
            {!isFetching && lembretes.length? lembretes.map((lembrete) => (
              <BoxLembrete
                lembrete={lembrete}
                key={`lembrete-${lembrete.id}`}
              />
            )): null}
          </Styles.Body>
        </Styles.Content>
      </Styles.Container>
    </Layout>
  );
}
