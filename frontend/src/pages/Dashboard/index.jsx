import * as Styles from "./styles";
import { Layout } from "../../components/Layout";
import { BoxHome } from "../../components/BoxHome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventoDashboard } from "../../components/EventoDashboard";
import { usePageTitle } from "../../hooks/page-title";
import { CalendarItem } from "../../components/CalendarItem";
import { useDashboard } from "../../hooks/dashboard";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from 'lodash';

export const Dashboard = () => {
  usePageTitle(window.location.pathname === '/demandas'? 'Demandas': 'Dashboard');

  const navigate = useNavigate();
  const { fetchDashboard, isFetching, loadMoreCompromissos, isLoadingMore, updateCompromisso } = useDashboard();

  const [obrigacoes, setObrigacoes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [paginaDeDemandas, setPaginaDeDemandas] = useState(true);
  const [dateToFilter, setDateToFilter] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);

  // useEffect observa a rota atual e seta a variável paginaDeDemandas se for /demandas
  useEffect(() => {
    setPaginaDeDemandas(window.location.pathname === '/demandas');
    let dateToFilter = '';
    // está na página de dashboard
    if (window.location.pathname !== '/demandas') {
      dateToFilter = new Date().toISOString().split('T')[0];
    }
    setDateToFilter(dateToFilter)
    setObrigacoes([]);
    setEventos([]);
    setTotal(0);
    setTotalPaginas(0);
    setPagina(1);
    fetchDashboard(dateToFilter).then((data) => {
      setObrigacoes(data.obrigacoes);
      setEventos(data.eventos);
      setTotal(data.total);
      setTotalPaginas(data.totalPaginas);
    });
  }, [window.location.pathname]);

  const handleLoadMoreObrigacoes = () => {
    const obrigacoesObj = [...obrigacoes];
    const nextPagina = pagina + 1;
    loadMoreCompromissos(nextPagina, dateToFilter).then((data) => {
      const novasObrigacoes = data.obrigacoes.filter(dataObrigacao => {
        return obrigacoesObj.some(obrigacao => obrigacao.id === dataObrigacao.id) === false;
      });
      setObrigacoes([...obrigacoesObj, ...novasObrigacoes]);
      setTotal(data.total);
      setPagina(pagina < totalPaginas? nextPagina: pagina);
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  useEffect(() => {
    const dates = eventos.map(evento => {
      return {
        data_inicio: evento.data_inicio,
        data_fim: evento.data_fim,
      };
    });
    setSelectedDates(dates);
  }, [eventos]);

  const onUpdateObrigacao = (obrigacao, values) => {
    const obrigacoesObj = [...obrigacoes];
    const obrigacaoIndex = obrigacoesObj.findIndex((obrigacaoItem) => obrigacaoItem.id === obrigacao.id);
    if (obrigacaoIndex === -1) {
      return;
    }
    if (obrigacoesObj[obrigacaoIndex].saving) {
      return;
    }
    setObrigacoes(obrigacoesObj.map((obrigacaoItem) => {
      if (obrigacaoItem.id === obrigacao.id) {
        return {
          ...obrigacaoItem,
          ...values,
          saving: true,
        };
      }
      return obrigacaoItem;
    }));
    updateCompromisso(obrigacao.id, 1).then((data) => {
      setObrigacoes(obrigacoesObj.map((obrigacaoItem) => {
        if (obrigacaoItem.id === obrigacao.id) {
          return {
            ...obrigacaoItem,
            ...values,
            saving: false,
            status: 1,
          };
        }
        return obrigacaoItem;
      }));
      toast.success('Obrigação atualizada com sucesso!');
    }).catch((error) => {
      setObrigacoes(obrigacoesObj.map((obrigacaoItem) => {
        if (obrigacaoItem.id === obrigacao.id) {
          return {
            ...obrigacaoItem,
            saving: false,
            status: 0,
          };
        }
        return obrigacaoItem;
      }));
      toast.error(error.message);
    });
  }

  const handleEmpresaClick = (event, obrigacao) => {
    const obrigacoesObj = [...obrigacoes];
    // if the element is .obrigacao-checkbox or .obrigacao-checkbox *, do nothing
    if (event.target.closest('.obrigacao-checkbox')) {
      return false;
    }
    const obrigacaoIndex = obrigacoesObj.findIndex((obrigacaoItem) => obrigacaoItem.id === obrigacao.id);
    if (obrigacaoIndex === -1) {
      return;
    }
    navigate(`/empresas/${obrigacao.empresa_id}`);
  }

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <Styles.Header>
            <Styles.Title>{paginaDeDemandas? 'Demandas': 'Dashboard'}</Styles.Title>
          </Styles.Header>
          {isFetching && (
            <p>Aguarde! Carregando obrigacoes...</p>
          )}
          {!isFetching && obrigacoes.length === 0 && !paginaDeDemandas? (
            <p
              style={{
                fontSize: '1.2rem',
              }}
            >
              Nenhuma obrigação para o dia de hoje. <br />
              Você também pode
              <Link
                to="/demandas"
                style={{
                  color: 'var(--secondary-color)',
                  textDecoration: 'none',
                }}
              >
                &nbsp;visualizar as obrigações dos próximos dias.
              </Link>
              <br /><br /><br />
            </p>
          ): null}
          {!isFetching && obrigacoes.length === 0 && paginaDeDemandas? (
            <p
              style={{
                fontSize: '1.2rem',
              }}
            >
              Você não possui demandas. <br /><br />
            </p>
          ): null}
          {!isFetching && obrigacoes.length? obrigacoes.map((obrigacao) => (
            <BoxHome
              obrigacao={obrigacao}
              onClick={(event) => handleEmpresaClick(event, obrigacao)}
              onUpdate={values => onUpdateObrigacao(obrigacao, values)}
              key={`obrigacao-${obrigacao.id}`}
            />
          )): null}
          {isLoadingMore && (
            <p>Aguarde! Carregando mais obrigações...</p>
          )}
          {!isFetching && !isLoadingMore && total && pagina < totalPaginas? (
            <p>
              <a
                className="link-loading-more"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLoadMoreObrigacoes();
                }}
                style={{
                  color: 'var(--secondary-color)',
                  textDecoration: 'none',
                }}
              >
                Buscar mais obrigações...
              </a>
            </p>
          ): null}
        </Styles.Content>
        {paginaDeDemandas? '': (
          <Styles.Sidebar>
            <Styles.CalendarContent>
              <CalendarItem selectedDates={selectedDates} />
            </Styles.CalendarContent>
            <Styles.EventsContent>
              {eventos.length? eventos.map((evento) => (
                <EventoDashboard
                  evento={evento}
                  key={`evento-${evento.id}`}
                />
              )): null}
            </Styles.EventsContent>
          </Styles.Sidebar>
        )}
      </Styles.Container>
    </Layout>
  );
}
