import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { usePageTitle } from "../../hooks/page-title";
import * as Styles from "./styles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAgenda } from "../../hooks/agenda";
import { useEmpresa } from "../../hooks/empresa";

export const Agenda = () => {
  const params = useParams()
  const [agendaId, setAgendaId] = useState(params && Object.keys(params).length > 0 ? parseInt(params.id) : null)

  const { fetchEmpresas, isFetching } = useEmpresa();
  const {
    fetchEvento, isFetchingEvento,
    salvarEvento, isSaving,
    deleteEvento, isDeleting,
  } = useAgenda();

  useEffect(() => {
    setAgendaId(params && Object.keys(params).length > 0 ? parseInt(params.id) : null)
  }, [params])

  const [agenda, setAgenda] = useState({
    id: '',
    titulo: '',
    plataforma_reuniao: '',
    link_reuniao: '',
    descricao: '',
    data_inicio: '',
    data_fim: '',
  })
  const [empresas, setEmpresas] = useState([])

  usePageTitle(agendaId ? 'Editar Agenda' : 'Nova Agenda')

  useEffect(() => {
    fetchEmpresas({ limite: 50000, only: ['id', 'nome'] }).then((data) => {
      setEmpresas(data.empresas)
    }).catch((error) => {
      toast.error(error.message)
    })
  }, [])

  useEffect(() => {
    if (!agendaId) {
      setAgenda({
        id: '',
        titulo: '',
        plataforma_reuniao: '',
        empresa_id: '',
        link_reuniao: '',
        descricao: '',
        data_inicio: '',
        data_fim: '',
      })
      return;
    }
    fetchEvento(agendaId).then((data) => {
      setAgenda(data.evento)
    }).catch((error) => {
      toast.error(error.message)
    })
  }, [agendaId])

  const handleSalvar = () => {
    if (!agenda.titulo) {
      toast.error('Informe o título do evento')
      return;
    }
    if (!agenda.data_inicio) {
      toast.error('Informe a data de início do evento')
      return;
    }
    if (!agenda.data_fim) {
      toast.error('Informe a data de fim do evento')
      return;
    }
    const data_inicio = new Date(agenda.data_inicio)
    const data_fim = new Date(agenda.data_fim)
    if (data_inicio.getTime() > data_fim.getTime()) {
      toast.error('A data de início deve ser anterior à data de fim')
      return;
    }
    salvarEvento(agenda).then((data) => {
      toast.success('Evento salvo com sucesso!')
      if (!agendaId) {
        window.location.href = `/agendas/${data.evento.id}`
      }
      setAgenda(data.evento)
    }).catch((error) => {
      toast.error(error.message)
    })
  }

  const notifyRemover = (resolve) => {
    toast(({ closeToast }) => (
      <div>
        <p>Você tem certeza que deseja remover?</p>
        <div className="toast-validacao-center">
          <button onClick={() => {
            closeToast()
            resolve(false)
          }}>Não</button>
          <button onClick={() => {
            closeToast()
            resolve(true)
          }}>Sim</button>
        </div>
      </div>
    ), {
      position: 'top-center',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      toastId: 'toast-validacao'
    })
  }

  const handleRemover = () => {
    return new Promise((resolve) => {
      notifyRemover(resolve)
    }).then((remover) => {
      if (!remover) {
        return;
      }
      deleteEvento(agendaId).then(() => {
        toast.success('Evento excluído com sucesso!')
        setTimeout(() => {
          window.location.href = '/agendas'
        }, 1000);
      }).catch((error) => {
        toast.error(error.message)
      })
    })
  }

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          {isFetchingEvento? (<p>Aguarde...</p>): (
            <Styles.Body>
              <Styles.Header>
                {agendaId ? (agenda.titulo || 'Dados do evento') : 'Novo evento'}
              </Styles.Header>
              <Styles.Form
                onSubmit={(event) => {
                  event.preventDefault()
                  handleSalvar()
                }}
              >
                <Styles.FormGroup>
                  <Styles.Select
                    className="cols-4"
                    placeholder="Empresa"
                    disabled={agendaId || isFetching}
                    value={agenda.empresa_id}
                    onChange={(event) => setAgenda({ ...agenda, empresa_id: event.target.value })}
                  >
                    <option value="">Selecione uma empresa</option>
                    {empresas.map((empresa) => (
                      <option key={`empresa-${empresa.id}`} value={empresa.id}>
                        {empresa.nome}
                      </option>
                    ))}
                  </Styles.Select>
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-4"
                    placeholder="Título do evento"
                    value={agenda.titulo}
                    disabled={isFetching}
                    onChange={(event) => setAgenda({ ...agenda, titulo: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Textarea
                    className="cols-4"
                    placeholder="Descrição do evento"
                    value={agenda.descricao}
                    onChange={(event) => setAgenda({ ...agenda, descricao: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-4"
                    disabled={isFetching}
                    placeholder="Plataforma de reunião"
                    value={agenda.plataforma_reuniao}
                    onChange={(event) => setAgenda({ ...agenda, plataforma_reuniao: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    type="url"
                    className="cols-4"
                    disabled={isFetching}
                    placeholder="Link da reunião"
                    value={agenda.link_reuniao}
                    onChange={(event) => setAgenda({ ...agenda, link_reuniao: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    type="datetime-local"
                    className="cols-2"
                    disabled={isFetching}
                    placeholder="Data de início"
                    value={agenda.data_inicio}
                    onChange={(event) => setAgenda({ ...agenda, data_inicio: event.target.value })}
                  />
                  <Styles.Input
                    type="datetime-local"
                    className="cols-2"
                    placeholder="Data de fim"
                    value={agenda.data_fim}
                    onChange={(event) => setAgenda({ ...agenda, data_fim: event.target.value })}
                  />
                </Styles.FormGroup>
              </Styles.Form>
              <Styles.Footer>
                <Styles.Button
                  onClick={handleSalvar}
                  disabled={isFetchingEvento || isFetching || isSaving || isDeleting}
                >
                  {isSaving? 'Salvando...': 'Salvar'}
                </Styles.Button>
                {!agendaId? null: (
                  <Styles.Button
                    className="danger"
                    onClick={handleRemover}
                    disabled={isFetchingEvento || isFetching || isSaving || isDeleting}
                  >
                    {isSaving? 'Removendo...': 'Remover'}
                  </Styles.Button>
                )}
              </Styles.Footer>
            </Styles.Body>
          )}
        </Styles.Content>
      </Styles.Container>
    </Layout>
  );
}
