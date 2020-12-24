import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// import CreateGameButton from "./CreateGameNavButton";

const NavBar = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="justify-content-between"
    >
      <Navbar.Brand>
        <Link to="/">Crossword Creator</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-nav" />
      {/* <Navbar.Collapse id="main-nav" className="justify-content-end">
        <Nav>
          <CreateGameButton />
        </Nav>
      </Navbar.Collapse> */}
    </Navbar>
  );
};

export default NavBar;
