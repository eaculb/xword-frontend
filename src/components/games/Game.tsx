import React from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Board, { BOARD_DETAIL } from "./Board";
import ClueInterface, { CLUE_DETAIL } from "./ClueInterface";

const GET_GAME_DETAIL = gql`
  query GetGameDetail($gameId: String!) {
    game(gameId: $gameId) {
      id
      title
      ...BoardDetail
      clues {
        ...ClueDetail
      }
    }
  }
  ${BOARD_DETAIL}
  ${CLUE_DETAIL}
`;

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export default function Game({ match }: Props) {
  const gameId = match.params.id;

  const { data, loading, error } = useQuery(GET_GAME_DETAIL, {
    variables: { gameId },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const { game } = data;
  const { title, clues } = game;
  return (
    <div className="m-4">
      <Row>
        <Col>
          <h1>{title || "Untitled Game"}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Board game={game} />
        </Col>
        <Col>
          <ClueInterface clues={clues} />
        </Col>
      </Row>
    </div>
  );
}
