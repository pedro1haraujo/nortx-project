import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { usePageTitle } from "../../hooks/page-title";
import * as Styles from "./styles";
import { useEffect, useState } from "react";
import { useEmpresa } from "../../hooks/empresa";
import { estados } from "../../helpers/estados"
import { toast } from "react-toastify";

export const Empresa = () => {
  const params = useParams()
  const [empresaId, setEmpresaId] = useState(params && Object.keys(params).length > 0 ? parseInt(params.id) : null)

  useEffect(() => {
    setEmpresaId(params && Object.keys(params).length > 0 ? parseInt(params.id) : null)
  }, [params])

  const [empresa, setEmpresa] = useState({
    id: '',
    nome: '',
    cnpj: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    telefone: '',
    email: '',
    inscricao_municipal: '',
    inscricao_estadual: '',
  })
  const [proprietario, setProprietario] = useState({
    id: '',
    nome: '',
    data_nascimento: '',
    cpf: '',
    telefone: '',
    celular: '',
    endereco: '',
    numero: '',
    bairro: '',
  })
  const [obrigacoesEmpresa, setObrigacoesEmpresa] = useState([])
  const [obrigacoes, setObrigacoes] = useState([])
  const [socios, setSocios] = useState([])
  const [loading, setLoading] = useState(true)

  const { fetchEmpresa, saveEmpresa, isSaving, deleteEmpresa, isDeleting } = useEmpresa();

  usePageTitle(empresaId ? 'Editar Empresa': 'Nova Empresa')

  useEffect(() => {
    if (!empresaId) {
      setEmpresa({
        id: '',
        nome: '',
        cnpj: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: '',
        email: '',
        inscricao_municipal: '',
        inscricao_estadual: '',
      })
      setProprietario({
        id: '',
        nome: '',
        data_nascimento: '',
        cpf: '',
        telefone: '',
        celular: '',
        endereco: '',
        numero: '',
        bairro: '',
      })
      setSocios([])
      setObrigacoesEmpresa([])
      setLoading(false)
      return;
    }
    fetchEmpresa(empresaId).then((data) => {
      setEmpresa(data.empresa)
      setProprietario(data.proprietario)
      setSocios(data.socios)
      setObrigacoes(data.obrigacoes)
      setObrigacoesEmpresa(data.obrigacoes_empresa)
      setLoading(false)
    });
  }, [empresaId])

  const handleAdicionarSocio = () => {
    const socio = {
      id: '',
      nome: '',
      data_nascimento: '',
      cpf: '',
      telefone: '',
      celular: '',
      endereco: '',
      numero: '',
      bairro: '',
    };
    setSocios([...socios, socio]);
  }

  const setSocio = (socioIndex, values) => {
    const sociosCopy = [...socios];
    sociosCopy[socioIndex] = values;
    setSocios(sociosCopy);
  }

  const handleSalvar = () => {
    if (!empresa.nome) {
      toast.error('Informe o nome da empresa');
      return;
    }
    if (!empresa.cnpj) {
      toast.error('Informe o CNPJ da empresa');
      return;
    }
    if (!proprietario.nome) {
      toast.error('Informe o nome do proprietário');
      return;
    }
    if (!proprietario.cpf) {
      toast.error('Informe o CPF do proprietário');
      return;
    }
    const algumSocioSemNomeOuCpf = socios.some(socio => !socio.nome || !socio.cpf);
    if (algumSocioSemNomeOuCpf) {
      toast.error('Informe o nome e o CPF de todos os sócios');
      return;
    }
    saveEmpresa(empresa, proprietario, socios, obrigacoesEmpresa)
      .then((data) => {
        toast.success('Empresa salva com sucesso!');
        if (!empresa.id) {
          window.location.href = `/empresas/${data.empresa.id}`;
          return;
        }
        setEmpresa(data.empresa);
        setProprietario(data.proprietario);
        setSocios(data.socios);
        setObrigacoesEmpresa(data.obrigacoes);
      }).catch((error) => {
        toast.error(error.message);
      });
  }

  const handleUpdateObrigacao = (obrigacaoId) => {
    const obrigacoesEmpresaCopy = [...obrigacoesEmpresa];
    let obrigacaoEmpresaIndex = obrigacoesEmpresaCopy.findIndex(obrigacao_id => obrigacao_id === obrigacaoId);
    if (obrigacaoEmpresaIndex === -1) {
      obrigacoesEmpresaCopy.push(obrigacaoId);
      setObrigacoesEmpresa(obrigacoesEmpresaCopy);
      return;
    }
    setObrigacoesEmpresa(obrigacoesEmpresa.filter(obrigacao_id => obrigacao_id !== obrigacaoId));
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
      deleteEmpresa(empresaId).then(() => {
        toast.success('Empresa excluída com sucesso!')
        setTimeout(() => {
          window.location.href = '/empresas'
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
          {loading? (<p>Aguarde...</p>): (
            <Styles.Body>
              <Styles.Header>
                {empresaId ? 'Dados da Empresa' : 'Nova Empresa'}
              </Styles.Header>
              <Styles.Form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSalvar();
                }}
              >
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-3"
                    placeholder="Nome da Empresa"
                    value={empresa.nome || ''}
                    onChange={(event) => setEmpresa({ ...empresa, nome: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="CNPJ da Empresa"
                    value={empresa.cnpj || ''}
                    onChange={(event) => setEmpresa({ ...empresa, cnpj: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-2"
                    placeholder="Endereço da Empresa"
                    value={empresa.endereco || ''}
                    onChange={(event) => setEmpresa({ ...empresa, endereco: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Número"
                    value={empresa.numero || ''}
                    onChange={(event) => setEmpresa({ ...empresa, numero: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Bairro"
                    value={empresa.bairro || ''}
                    onChange={(event) => setEmpresa({ ...empresa, bairro: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-1"
                    placeholder="Cidade"
                    value={empresa.cidade || ''}
                    onChange={(event) => setEmpresa({ ...empresa, cidade: event.target.value })}
                  />
                  <Styles.Select
                    className="cols-1"
                    placeholder="Estado"
                    value={empresa.estado || ''}
                    onChange={(event) => setEmpresa({ ...empresa, estado: event.target.value })}
                  >
                    <option value="" disabled>Selecione</option>
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
                    ))}
                  </Styles.Select>
                  <Styles.Input
                    className="cols-1"
                    placeholder="Telefone"
                    value={empresa.telefone || ''}
                    onChange={(event) => setEmpresa({ ...empresa, telefone: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Email"
                    value={empresa.email || ''}
                    onChange={(event) => setEmpresa({ ...empresa, email: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-2"
                    placeholder="Inscrição Municipal"
                    value={empresa.inscricao_municipal || ''}
                    onChange={(event) => setEmpresa({ ...empresa, inscricao_municipal: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-2"
                    placeholder="Inscrição Estadual"
                    value={empresa.inscricao_estadual || ''}
                    onChange={(event) => setEmpresa({ ...empresa, inscricao_estadual: event.target.value })}
                  />
                </Styles.FormGroup>
              </Styles.Form>
              <Styles.FormTitle>Proprietário</Styles.FormTitle>
              <Styles.Form>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-3"
                    placeholder="Nome Completo"
                    value={proprietario.nome || ''}
                    onChange={(event) => setProprietario({ ...proprietario, nome: event.target.value })}
                  />
                  <Styles.Input
                    type="date"
                    className="cols-1"
                    placeholder="Data de Nascimento"
                    value={proprietario.data_nascimento || ''}
                    onChange={(event) => setProprietario({ ...proprietario, data_nascimento: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-2"
                    placeholder="CPF"
                    value={proprietario.cpf || ''}
                    onChange={(event) => setProprietario({ ...proprietario, cpf: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Telefone"
                    value={proprietario.telefone || ''}
                    onChange={(event) => setProprietario({ ...proprietario, telefone: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Celular"
                    value={proprietario.celular || ''}
                    onChange={(event) => setProprietario({ ...proprietario, celular: event.target.value })}
                  />
                </Styles.FormGroup>
                <Styles.FormGroup>
                  <Styles.Input
                    className="cols-2"
                    placeholder="Endereço"
                    value={proprietario.endereco || ''}
                    onChange={(event) => setProprietario({ ...proprietario, endereco: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Número"
                    value={proprietario.numero || ''}
                    onChange={(event) => setProprietario({ ...proprietario, numero: event.target.value })}
                  />
                  <Styles.Input
                    className="cols-1"
                    placeholder="Bairro"
                    value={proprietario.bairro || ''}
                    onChange={(event) => setProprietario({ ...proprietario, bairro: event.target.value })}
                  />
                </Styles.FormGroup>
              </Styles.Form>
              {!socios || !socios.length? null: socios.map((socio, socioIndex) => (
                <div key={socioIndex}>
                  <Styles.FormTitle>
                    Sócio {socioIndex + 1}
                    <Styles.FormButton
                      onClick={() => {
                        if (!confirm('Deseja remover o sócio?')) {
                          return;
                        }
                        const sociosCopy = [...socios];
                        sociosCopy.splice(socioIndex, 1);
                        setSocios(sociosCopy);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                      Remover sócio
                    </Styles.FormButton>
                  </Styles.FormTitle>
                  <Styles.Form>
                    <Styles.FormGroup>
                      <Styles.Input
                        className="cols-3"
                        placeholder="Nome Completo"
                        value={socio.nome || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, nome: event.target.value })}
                      />
                      <Styles.Input
                        type="date"
                        className="cols-1"
                        placeholder="Data de Nascimento"
                        value={socio.data_nascimento || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, data_nascimento: event.target.value })}
                      />
                    </Styles.FormGroup>
                    <Styles.FormGroup>
                      <Styles.Input
                        className="cols-2"
                        placeholder="CPF"
                        value={socio.cpf || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, cpf: event.target.value })}
                      />
                      <Styles.Input
                        className="cols-1"
                        placeholder="Telefone"
                        value={socio.telefone || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, telefone: event.target.value })}
                      />
                      <Styles.Input
                        className="cols-1"
                        placeholder="Celular"
                        value={socio.celular || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, celular: event.target.value })}
                      />
                    </Styles.FormGroup>
                    <Styles.FormGroup>
                      <Styles.Input
                        className="cols-2"
                        placeholder="Endereço"
                        value={socio.endereco || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, endereco: event.target.value })}
                      />
                      <Styles.Input
                        className="cols-1"
                        placeholder="Número"
                        value={socio.numero || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, numero: event.target.value })}
                      />
                      <Styles.Input
                        className="cols-1"
                        placeholder="Bairro"
                        value={socio.bairro || ''}
                        onChange={(event) => setSocio(socioIndex, { ...socio, bairro: event.target.value })}
                      />
                    </Styles.FormGroup>
                  </Styles.Form>
                </div>
              ))}
              <Styles.Footer>
                <Styles.Button
                  onClick={handleSalvar}
                  disabled={isSaving}
                >
                  {isSaving? 'Salvando...': 'Salvar'}
                </Styles.Button>
                {empresaId? (
                  <Styles.Button
                    className="danger"
                    onClick={handleRemover}
                    disabled={isDeleting}
                  >
                    {isDeleting? 'Removendo...': 'Remover'}
                  </Styles.Button>
                ): null}
              </Styles.Footer>
            </Styles.Body>
          )}
        </Styles.Content>
        <Styles.Sidebar>
          {obrigacoes.length === 0? null: (
            <Styles.Obrigacoes>
              <Styles.ObrigacoesTitle>Obrigações</Styles.ObrigacoesTitle>
              <Styles.ObrigacoesList>
                {obrigacoes.map((obrigacao) => (
                  <Styles.ObrigacoesItem
                    key={`obrigacao-${obrigacao.titulo}`}
                    onClick={() => handleUpdateObrigacao(obrigacao.id)}
                  >
                    <Styles.ObrigacoesItemIcon
                      className={`fa fa-${obrigacoesEmpresa.includes(obrigacao.id) ? 'square-check' : 'square'}`}
                    />
                    <Styles.ObrigacoesItemLabel>
                      <strong>{obrigacao.id} {obrigacao.titulo}</strong> - {obrigacao.descricao}
                    </Styles.ObrigacoesItemLabel>
                  </Styles.ObrigacoesItem>
                ))}
              </Styles.ObrigacoesList>
            </Styles.Obrigacoes>
          )}
          <Styles.Button onClick={handleAdicionarSocio}>
            Adicionar sócio
          </Styles.Button>
        </Styles.Sidebar>
      </Styles.Container>
    </Layout>
  );
}
