import React from "react";
import { gql } from "@apollo/client";

import Container from "react-bootstrap/Container";

import { ClueDetail } from "./__generated__/ClueDetail";

export const CLUE_DETAIL = gql`
  fragment ClueDetail on Clue {
    squareIndex
    direction
    clue
  }
`;

interface Props {
  clues: ClueDetail[];
}

export default function ClueInterface({ clues }: Props) {
  return (
    <Container>
      <h2>Clues</h2>

      {clues.map((clue: ClueDetail) => (
        <p>{clue.clue}</p>
      ))}
    </Container>
  );
}
