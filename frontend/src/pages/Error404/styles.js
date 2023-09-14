import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;

  @media screen and (min-width: 900px) {
    width: 500px;
    margin: 0 auto;
  }

  h1 {
    font-size: 8rem;
    font-weight: 700;
    color: #ddd;
  }

  h2 {
    margin-top: -20px;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
    color: #ddd;
  }

  a {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--secondary-color);
    text-decoration: none;
    margin-top: 1rem;
  }
`;
