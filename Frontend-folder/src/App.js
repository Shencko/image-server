// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";
import UploadPage from "./components/UploadPage";
import SearchPage from "./components/SearchPage";
import DetailView from "./components/DetailView";

const App = () => (
  <Router>
    <Container>
      <Header>
        <Nav>
          <NavList>
            <NavItem>
              <StyledLink to="/">Upload</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/search">Search</StyledLink>
            </NavItem>
          </NavList>
        </Nav>
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailView />} />
        </Routes>
      </Main>
    </Container>
  </Router>
);

export default App;

const Container = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  background-color: #333;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.main`
  padding: 20px 0;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
