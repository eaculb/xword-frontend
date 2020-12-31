import React, { useState } from "react";
import { gql } from "@apollo/client";

import Square, { SQUARE_DETAIL } from "./Square";
import { GetGameDetail_game } from "./__generated__/GetGameDetail";

export const BOARD_DETAIL = gql`
  fragment BoardDetail on Game {
    id
    enforceSymmetry
    size
    squares {
      ...SquareDetail
    }
  }
  ${SQUARE_DETAIL}
`;

interface Props {
  game: GetGameDetail_game;
}

export default function Board({ game }: Props) {
  const [selectedIx, setSelectedIx] = useState<number>(0);
  const [selectedIsAcross, setSelectedIsAcross] = useState<boolean>(true);

  const { id: gameId, enforceSymmetry, size, squares } = game;

  let rows = [];
  // Ensure squares are sorted by index before mapping
  const sortedSquares = squares.slice().sort((a, b) => a.index - b.index);
  for (let i = 0; i < size; i++) {
    rows.push(sortedSquares.slice(i * size, (i + 1) * size));
  }

  return (
    <div>
      {rows.map((row, rowix) => (
        <div key={rowix} className="d-flex flex-row">
          {row.map((square) => (
            <Square
              gameId={gameId}
              gameSize={size * size}
              enforceSymmetry={enforceSymmetry}
              key={square.index}
              square={square}
              top={square.index < size}
              left={square.index % size === 0}
              right={square.index % size === size - 1}
              bottom={square.index >= size * (size - 1)}
              active={square.index === selectedIx}
              setSelectedIx={setSelectedIx}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
