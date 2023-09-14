import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled(Link)`
  background: var(--box-de-texto);
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
  display: block;
  text-decoration: none;
`

export const Title = styled.h4`
  font-size: 14px;
  color: #999;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Description = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #ccc;
`

export const ButtonIcon = styled.i`
  position: absolute;
  top: calc(50% - 10px);
  right: -5px;
  margin: auto;
  cursor: pointer;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 10px;
  color: #333;
  border-radius: 50%;
  background: #888;
  text-decoration: none;
  cursor: pointer;
`

