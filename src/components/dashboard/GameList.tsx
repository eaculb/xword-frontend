import React from "react";

import Col from "react-bootstrap/Col";

import GameLink from "./GameLink";

interface Props {
  games: any[];
}

export default function GameList({ games }: Props) {
  return (
    <div className="d-flex flex-column justify-content-flex-start">
      {games.map((g) => (
        <GameLink key={g.id} to={`/games/${g.id}`}>
          {g.title || "Untitled Game"}
        </GameLink>
      ))}
    </div>
  );
}
