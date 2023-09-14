import styles from "styled-components"

export const Container = styles.div`
  width: calc(100vw - 390px);

  @media screen and (min-width: 1200px)  {
    max-width: 900px;
  }

  .link-loading-more {
    display: block;
    color: var(--color-primary);
  }
`

export const Content = styles.div`
  padding: 10px 20px 10px 10px;

  @media screen and (min-width: 1100px) {
    padding: 20px 40px;
  }
`;

export const Header = styles.div`
  margin-bottom: 30px;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #777;
  display: grid;
  grid-template-columns: 1fr 200px;
  align-items: center;
  gap: 10px;
`;

export const Title = styles.h2``;

export const Search = styles.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background: #eee;
  padding: 0 20px;
  height: 40px;
`;

export const SearchIcon = styles.i`
  width: 25px;
  color: #777;
`;

export const SearchInput = styles.input`
  width: calc(100% - 25px);
  height: 40px;
  padding: 0 5px;
  border: none;
  background: none;
`;

export const Body = styles.div``;
