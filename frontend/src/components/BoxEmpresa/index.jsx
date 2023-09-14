import * as Styles from "./styles"

export const BoxEmpresa = ({ empresa, onClick }) => {
  return (
    <Styles.Container onClick={onClick}>
      <Styles.Body>
        <Styles.Nome>{empresa.nome}</Styles.Nome>
      </Styles.Body>
    </Styles.Container>
  );
}
