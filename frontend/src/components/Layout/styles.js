import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`

export const Main = styled.main`
  margin-left: 80px;
  padding: 20px;
`

export const MainContent = styled.div`
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`
