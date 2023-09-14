import { useEffect, useState } from "react"
import * as Styles from "./styles"

export const EventoDashboard = ({ evento }) => {
  function formatDate(date) {
    const dateObj = new Date(date)
    const dateAndMonth = dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    })
    return dateAndMonth
  }

  const [dataFormatada, setDataFormatada] = useState("")

  useEffect(() => {
    const dataInicio = formatDate(evento.data_inicio)
    const dataFim = formatDate(evento.data_fim)
    const dataFormatada = dataInicio === dataFim ? dataInicio : `${dataInicio} à ${dataFim}`
    setDataFormatada(dataFormatada)
  }, [evento])

  return (
    <Styles.Container to={`/agendas/${evento.id}`}>
      <Styles.Title title={`${dataFormatada} - ${evento.titulo}`}>
        {dataFormatada} - {evento.titulo}
      </Styles.Title>
      <Styles.Description>{evento.descricao}</Styles.Description>
      <Styles.ButtonIcon className="fa fa-chevron-right" />
    </Styles.Container>
  )
}
