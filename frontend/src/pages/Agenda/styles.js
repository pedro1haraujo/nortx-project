import styled from 'styled-components';

export const Container = styled.div`
  @media screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 500px;
  }
`

export const Content = styled.div`
  padding: 0 40px 0 10px;
`

export const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #777;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Body = styled.div``

export const Form = styled.form``

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 10px;
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

export const Select = styled.select`
  background: var(--box-de-texto);
  border: 0;
  height: 55px;
  padding: 5px 20px;
  color: #ddd;

  &::placeholder {
    color: #999;
  }

  &.cols-1 { width: 25%; }
  &.cols-2 { width: 50%; }
  &.cols-3 { width: 75%; }
  &.cols-4 { width: 100%; }
`

export const Input = styled.input`
  background: var(--box-de-texto);
  border: 0;
  height: 55px;
  padding: 5px 20px;
  color: #ddd;

  &::placeholder {
    color: #999;
  }

  &.cols-1 { width: 25%; }
  &.cols-2 { width: 50%; }
  &.cols-3 { width: 75%; }
  &.cols-4 { width: 100%; }
`

export const Textarea = styled.textarea`
  background: var(--box-de-texto);
  border: 0;
  height: 100px;
  padding: 15px 20px;
  color: #ddd;

  &::placeholder {
    color: #999;
  }

  &.cols-1 { width: 25%; }
  &.cols-2 { width: 50%; }
  &.cols-3 { width: 75%; }
  &.cols-4 { width: 100%; }
`

export const Footer = styled.footer`
  margin: 30px 0;
  display: flex;
  flex-direction: row;
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

  &:not(:disabled):hover, &:not(:disabled):active {
    background: var(--secondary-color-hover);
  }

  &:disabled {
    filter: grayscale(1);
    cursor: not-allowed;
  }

  &.danger {
    background: #ff4040;
  }
`
