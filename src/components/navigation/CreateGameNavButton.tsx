import React from "react";
import { Link } from "react-router-dom";

import NavBarLink from "../utils/NavBarLink";

export default function CreateGameNavButton() {
    return (
        <NavBarLink as={Link} to="/new-game">
        New Project
      </NavBarLink>
    )
}
