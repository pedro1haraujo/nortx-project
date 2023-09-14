import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;

    &.loading {
      animation: loading 1s infinite;
    }
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg)
    }
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 400px;

  input {
    width: 300px;
    height: 50px;
    border: none;
    background: rgba(0,0,0,.5);
    color: #ccc;
    padding: 0 20px;
    border-radius: 18px;

    &:disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }
  }

  button {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: none;
    background: var(--secondary-color);
    color: var(--primary-color);
    font-weight: bolder;
    font-size: 18px;
    border-radius: 18px;
    margin-top: 20px;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }
  }

  button:not(:disabled):hover {
    background: var(--secondary-color-hover);
  }
`

export const FormGroup = styled.div`
  margin-bottom: 20px;
`
