import React from "react";

import Board from "./Board";

interface Props {
  size: number;
}

export default function Game({ size }: Props) {
  return <Board />;
}
