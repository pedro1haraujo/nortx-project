import * as Styles from "./styles";
import { Layout } from "../../components/Layout";
import { BoxEmpresa } from "../../components/BoxEmpresa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../../hooks/page-title";
import { useEmpresas } from "../../hooks/empresas";
import { toast } from "react-toastify";

export const Empresas = () => {
  usePageTitle("Empresas");

  const navigate = useNavigate();

  const [empresas, setEmpresas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const {
    fetchEmpresas, isFetching,
    loadMoreEmpresas, isLoadingMore,
    searchEmpresas, isSearching,
  } = useEmpresas();

  useEffect(() => {
    handleFetchEmpresas();
  }, []);

  const handleFetchEmpresas = () => {
    fetchEmpresas().then((data) => {
      const novasEmpresas = data.empresas.filter(dataEmpresa => {
        return empresas.some(empresa => empresa.id === dataEmpresa.id) === false;
      });
      setPagina(1);
      setTotalPaginas(data.totalPaginas);
      setEmpresas([...empresas, ...novasEmpresas]);
    });
  }

  const handleSearch = (search) => {
    if (search === '') {
      setPagina(1);
      handleFetchEmpresas();
      return;
    }
    if (isSearching) {
      return;
    }
    setPagina(1);
    searchEmpresas(search, pagina).then((data) => {
      setEmpresas(data.empresas);
      setTotalPaginas(1);
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  const handleEmpresaClick = (event, empresa) => {
    // if the element is .empresa-checkbox or .empresa-checkbox *, do nothing
    if (event.target.closest('.empresa-checkbox')) {
      return false;
    }
    const empresaIndex = empresas.findIndex((empresaItem) => empresaItem.id === empresa.id);
    if (empresaIndex === -1) {
      return;
    }
    navigate(`/empresas/${empresa.id}`);
  }

  const handleLoadMore = () => {
    if (pagina >= totalPaginas) {
      return;
    }
    setPagina(pagina + 1);
    loadMoreEmpresas(pagina + 1).then((data) => {
      const novasEmpresas = data.empresas.filter(dataEmpresa => {
        return empresas.some(empresa => empresa.id === dataEmpresa.id) === false;
      });
      setEmpresas([...empresas, ...novasEmpresas]);
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <Styles.Header>
            <Styles.Title>Todas as Empresas</Styles.Title>
            <Styles.Search>
              <Styles.SearchIcon className="fas fa-search" />
              <Styles.SearchInput
                type="text"
                placeholder="Pesquisar..."
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch(event.target.value);
                  }
                }}
              />
            </Styles.Search>
          </Styles.Header>
          <Styles.Body>
            {isFetching && (
              <p>Aguarde! Carregando empresas...</p>
            )}
            {!isFetching && empresas.length === 0? (
              <p>Nenhuma empresa cadastrada.</p>
            ): null}
            {!isFetching && empresas.length? empresas.map((empresa) => (
              <BoxEmpresa
                empresa={empresa}
                onClick={(event) => handleEmpresaClick(event, empresa)}
                key={`empresa-${empresa.id}`}
              />
            )): null}
            {isLoadingMore && (
              <p>Aguarde! Carregando mais empresas...</p>
            )}
            {!isFetching && !isLoadingMore && empresas.length && pagina < totalPaginas? (
              <p>
                <a
                  href="#"
                  className="link-loading-more"
                  onClick={(e) => e.preventDefault() || handleLoadMore()}
                >
                  Carregar mais empresas...
                </a>
              </p>
            ): null}
          </Styles.Body>
        </Styles.Content>
      </Styles.Container>
    </Layout>
  );
}
