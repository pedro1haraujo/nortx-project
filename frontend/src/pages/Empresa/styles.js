import styled from 'styled-components';

export const Container = styled.div`
  @media screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 300px;
  }
`

export const Content = styled.div`
  @media screen and (min-width: 1200px) {
    padding: 0 40px 0 10px;
  }
`

export const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #777;
`

export const Body = styled.div``

export const Form = styled.form``

export const FormGroup = styled.div`
  margin-bottom: 15px;

  @media screen and (max-width: 769px) {
    margin-bottom: 0;
  }

  @media screen and (min-width: 769px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`

export const FormTitle = styled.h4`
  font-size: 20px;
  margin: 40px 0 15px 0;
  position: relative;
`

export const FormButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: 0;
  color: var(--secondary-color);
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  i {
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
  }
`

export const Input = styled.input`
  background: var(--box-de-texto);
  border: 0;
  width: 100%;
  height: 55px;
  padding: 5px 20px;
  color: #ddd;

  &::placeholder {
    color: #999;
  }

  @media screen and (max-width: 769px) {
    margin-bottom: 15px;
  }

  @media screen and (min-width: 1200px) {
    &.cols-1 { width: 25% !important; }
    &.cols-2 { width: 50% !important; }
    &.cols-3 { width: 75% !important; }
  }
`

export const Select = styled.select`
  background: var(--box-de-texto);
  border: 0;
  width: 100%;
  height: 55px;
  padding: 5px 20px;
  color: #ddd;

  &::placeholder {
    color: #999;
  }

  @media screen and (max-width: 769px) {
    margin-bottom: 15px;
  }

  @media screen and (min-width: 1200px) {
    &.cols-1 { width: 25% !important; }
    &.cols-2 { width: 50% !important; }
    &.cols-3 { width: 75% !important; }
  }
`

export const Sidebar = styled.div``

export const Footer = styled.footer`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Button = styled.button`
  background: var(--secondary-color);
  color: #fff;
  border: 0;
  width: 160px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 30px;

  &:not(:disabled):not(.danger):hover, &:not(:disabled):not(.danger):active {
    background: var(--secondary-color-hover);
  }

  &:disabled {
    filter: grayscale(1);
    cursor: not-allowed;
  }

  &.danger {
    background: #ff4040;

    &:hover, &:active {
      background: #bf2020;
    }
  }
`

export const Obrigacoes = styled.div`
  background: var(--box-de-texto);
  border-radius: 10px;
`;

export const ObrigacoesTitle = styled.div`
  background: #333;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
`;

export const ObrigacoesList = styled.div`
  padding: 10px;
`;

export const ObrigacoesItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  gap: 10px;
  cursor: pointer;
`;

export const ObrigacoesItemIcon = styled.i`
  margin-top: 3px;
  color: var(--secondary-color);
`;

export const ObrigacoesItemLabel = styled.div``;
