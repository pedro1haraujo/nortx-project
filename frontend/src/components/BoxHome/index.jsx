import { useEffect, useState } from "react";
import * as Styles from "./styles"

export const BoxHome = ({ obrigacao, onUpdate, onClick }) => {
  const [dataFinalFormatada, setDataFinalFormatada] = useState('');

  useEffect(() => {
    if (!obrigacao || !obrigacao.date) {
      return;
    }
    const data = new Date(obrigacao.date.split('-').join('/'));
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }).format(data);
    setDataFinalFormatada(dataFormatada);
  }, [obrigacao]);

  const toggleComplete = (e) => {
    e.preventDefault();
    onUpdate({
      ...obrigacao,
      complete: !obrigacao.complete,
    });
  }

  return (
    <Styles.Container
      className={`${obrigacao.saving? 'saving': ''}`}
      onClick={onClick}
    >
      <Styles.Header>
        <Styles.Name>
          Empresa - {obrigacao.empresa.nome}
        </Styles.Name>
        <Styles.Date>
          Data final: {dataFinalFormatada}
        </Styles.Date>
        {obrigacao.obrigacao && obrigacao.obrigacao.proximo? (
          <Styles.Alert>
            <i className="fa fa-flag"></i>
          </Styles.Alert>
        ): null}
      </Styles.Header>
      <Styles.Body>
        <Styles.Type>{obrigacao.obrigacao.titulo}</Styles.Type>
        <Styles.Complete
          className="obrigacao-checkbox"
          onClick={toggleComplete}
        >
          {obrigacao.complete? (
            <i className="fa fa-square-check"></i>
          ): (
            <i className="fa fa-square"></i>
          )}
        </Styles.Complete>
      </Styles.Body>
    </Styles.Container>
  );
}
