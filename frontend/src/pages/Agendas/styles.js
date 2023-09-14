import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  @media screen and (min-width: 1200px) {
    width: 800px;
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
  display: flex;
  justify-content: space-between;
`

export const CreateButton = styled(Link)`
  background: none;
  border: 0;
  background: var(--secondary-color);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    filter: brightness(0.8);
  }

  i {
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
  }
`

export const Body = styled.div``
