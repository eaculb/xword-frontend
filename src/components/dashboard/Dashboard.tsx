import React from "react";
import { gql, useQuery } from "@apollo/client";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import CreateGameControl from "./CreateGameControl";
import GameList from "./GameList";

export const GAME_META = gql`
  fragment GameMeta on Game {
    id
    title
    size
  }
`;

const GAMES_QUERY = gql`
  query getGameList {
    games {
      ...GameMeta
    }
  }
  ${GAME_META}
`;

const Dashboard = () => {
  const { data, loading, error } = useQuery(GAMES_QUERY);

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const { games } = data;
  return (
    <Container>
      <Col
        md={4}
        className="d-flex flex-column justify-content-flex-start mt-4"
      >
        <CreateGameControl />
        <GameList games={games} />
      </Col>
    </Container>
  );
};

export default Dashboard;
