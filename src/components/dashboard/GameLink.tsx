import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children?: React.ReactNode;
}

export default function GameLink({ to, children }: Props) {
  return <Link to={to}>{children}</Link>;
}
