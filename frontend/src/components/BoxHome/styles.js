import styled from 'styled-components';

export const Container = styled.div`
  background: #555;
  margin-bottom: 25px;
  padding: 20px 20px 10px 20px;
  border-radius: 6px;
  cursor: pointer;

  &.saving {
    background: #333;
    animation: pulse 1s infinite;
    pointer-events: none;
  }

  @keyframes pulse {
    0% {
      background: #333;
    }
    50% {
      background: #444;
    }
    100% {
      background: #333;
    }
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #ccc;
  margin-bottom: 15px;
`

export const Name = styled.div``

export const Date = styled.div``

export const Alert = styled.div`
  color: #f00;
  font-size: 15px;
  margin-right: 10px;
`

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Type = styled.h2`
  margin: 0;
  margin-top: 10px;
`

export const Complete = styled.div`
  margin-top: 5px;
  color: #ddd;
  cursor: pointer;
  padding: 10px;
`
