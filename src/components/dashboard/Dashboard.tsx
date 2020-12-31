import React, { useCallback, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CreateGameControl from "./CreateGameControl";
import GameList from "./GameList";

const GAMES_QUERY = gql`
  query getGameList {
    games {
      id
      title
      size
    }
  }
`;

export type Game = {
  id: string;
  title: string | undefined;
  size: number;
};

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
        <CreateGameControl addGame={()=>{}} />
        <GameList games={games} />
      </Col>
    </Container>
  );
};

export default Dashboard;
