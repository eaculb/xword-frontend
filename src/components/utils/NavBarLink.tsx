import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import Nav from "react-bootstrap/Nav";
import { NavLinkProps } from "react-bootstrap/NavLink";

interface Props extends NavLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const NavBarLink = ({ to, className, children, ...props }: Props) => {
  return (
    <Nav.Link
      as={Link}
      to={to}
      className={classnames(className, "text-center")}
      {...props}
    >
      {children}
    </Nav.Link>
  );
};

export default NavBarLink;
