import React, { useState, useCallback, useMemo } from "react";
import { gql } from "@apollo/client";

import Square, { BLACK, SQUARE_DETAIL } from "./Square";
import {
  GetGameDetail_game,
  GetGameDetail_game_squares,
} from "./__generated__/GetGameDetail";

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
  const { id: gameId, enforceSymmetry, size, squares } = game;
  const getCol = useMemo(() => (ix: number) => ix % size, [size]);
  const getRow = useMemo(() => (ix: number) => (ix / size) | 0, [size]);

  const [selectedIx, setSelectedIx] = useState<number>(0);
  const [selectedIsAcross, setSelectedIsAcross] = useState<boolean>(true);

  const toggleIsAcross = useCallback(
    () => setSelectedIsAcross(!selectedIsAcross),
    [selectedIsAcross, setSelectedIsAcross]
  );

  // Ensure squares are sorted by index
  const sortedSquares = squares.slice().sort((a, b) => a.index - b.index);

  let rows: GetGameDetail_game_squares[][] = [];
  for (let i = 0; i < size; i++) {
    rows.push(sortedSquares.slice(i * size, (i + 1) * size));
  }

  const selectedWord = useMemo(() => {
    if (sortedSquares[selectedIx].char === BLACK) {
      return [selectedIx];
    }
    let result: GetGameDetail_game_squares[] = [];
    let slice;
    let start;
    if (selectedIsAcross) {
      slice = rows[getRow(selectedIx)];
      start = getCol(selectedIx);
    } else {
      slice = sortedSquares.filter(
        (square) => getCol(square.index) === getCol(selectedIx)
      );
      start = getRow(selectedIx);
    }
    let currIx = start;
    while (currIx < slice.length && slice[currIx].char !== BLACK) {
      result.push(slice[currIx]);
      currIx += 1;
    }
    currIx = start - 1;
    while (currIx >= 0 && slice[currIx].char !== BLACK) {
      result.push(slice[currIx]);
      currIx -= 1;
    }
    const word = result.map((square) => square.index);
    return word;
  }, [selectedIx, selectedIsAcross, getCol, getRow, sortedSquares]);

  return (
    <div>
      {rows.map((row, rowix) => (
        <div key={rowix} className="d-flex flex-row">
          {row.map((square) => (
            <Square
              gameId={gameId}
              size={size}
              enforceSymmetry={enforceSymmetry}
              key={square.index}
              square={square}
              top={getRow(square.index) === 0}
              left={getCol(square.index) === 0}
              right={getCol(square.index) === size - 1}
              bottom={getRow(square.index) === size - 1}
              secondary={selectedWord.includes(square.index)}
              selectedIx={selectedIx}
              setSelectedIx={setSelectedIx}
              toggleIsAcross={toggleIsAcross}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
