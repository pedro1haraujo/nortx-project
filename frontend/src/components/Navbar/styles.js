import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 80px;
  height: 100vh;
  background-color: var(--primary-color);
  padding: 10px 15px;

  &.navbar-expanded {
    width: 250px;
  }

  &.navbar-expanded ul span {
    display: inline-block;
  }
`

export const ToggleIcon = styled.button`
  position: absolute;
  top: 75px;
  right: -5px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 0.8rem;
  font-weight: 800;
`

export const LogoContainer = styled(Link)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const NavList = styled.ul`
  width: 100%;
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 0 15px;
`;

export const NavItem = styled.li`
  width: 100%;
  margin-bottom: 30px;
  transition: all 0.3s ease-in-out;
`;

export const NavListBottom = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 0 15px;
`

export const NavLink = styled(Link)`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 5px;

  &:hover {
    color: #ddd;
  }

  span {
    display: none;
    font-size: 1rem;
  }
`;
