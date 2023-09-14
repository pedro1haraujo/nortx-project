import { useEffect, useState } from "react";
import * as Styles from "./styles"

export const BoxAgenda = ({ agenda, onClick }) => {
  const [dataFormatada, setDataFormatada] = useState('')

  function formatDate(date) {
    const dateObject = new Date(date.split('-').join('/'))
    const dayAndMonth = dateObject.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
    let hourAndMinute = dateObject.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    if (hourAndMinute.indexOf(':00') > -1) {
      hourAndMinute = hourAndMinute.replace(':00', '')
    }
    return dayAndMonth + ' às ' + hourAndMinute + 'h'
  }

  useEffect(() => {
    let data_formatada = formatDate(agenda.data_inicio)
    const data_fim_formatada = formatDate(agenda.data_fim)
    if (data_fim_formatada !== data_formatada) {
      data_formatada += ' - ' + data_fim_formatada
    }
    setDataFormatada(data_formatada)
  }, [agenda])

  return (
    <Styles.Container onClick={onClick}>
      <Styles.Body>
        <Styles.Empresa>{agenda.empresa.nome}</Styles.Empresa>
        <Styles.Titulo>{agenda.titulo}</Styles.Titulo>
        <Styles.Descricao>{agenda.descricao}</Styles.Descricao>
        <Styles.Date>{dataFormatada}</Styles.Date>
      </Styles.Body>
    </Styles.Container>
  );
}
