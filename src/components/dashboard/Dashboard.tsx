import React, { useCallback, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CreateGameControl from "./CreateGameControl";
import GameList from "./GameList";

export type Game = {
  id: string;
  title: string | undefined;
  size: number;
};

const Dashboard = () => {
  const [games, setGames] = useState<Game[]>([
    { id: "dummy-id", title: "name", size: 15 },
    { id: "dummy-id-2", title: "name 2", size: 15 },
  ]);

  const addGame = useCallback(
    (g: Game) => {
      setGames([g, ...games]);
    },
    [games, setGames]
  );

  return (
    <Container>
      <Col
        md={4}
        className="d-flex flex-column justify-content-flex-start mt-4"
      >
        <CreateGameControl addGame={addGame} />
        <GameList games={games} />
      </Col>
    </Container>
  );
};

export default Dashboard;
