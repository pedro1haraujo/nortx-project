import { useEffect, useState } from "react"
import * as Styles from "./styles"

export const BoxLembrete = ({ lembrete, onClick }) => {
  const [dataFormatada, setDataFormatada] = useState('')

  function formatDate(date) {
    return new Date(date.substring(0, 10).split('-').join('/')).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }) + ' às ' + new Date(date.substring(0, 10).split('-').join('/') + ' ' + date.substring(11, 16)).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }) + 'h'
  }

  useEffect(() => {
    setDataFormatada(formatDate(lembrete.created_at))
  }, [lembrete])

  return (
    <Styles.Container onClick={onClick}>
      <Styles.Body>
        <Styles.Titulo>
          {lembrete.titulo}
        </Styles.Titulo>
        <Styles.Date>{dataFormatada}</Styles.Date>
      </Styles.Body>
    </Styles.Container>
  );
}
