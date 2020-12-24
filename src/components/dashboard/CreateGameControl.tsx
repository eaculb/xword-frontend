import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import CreateGameModal from "./CreateGameModal";

import { Game } from "./Dashboard";

interface Props {
  addGame: (g: Game) => void;
}

export default function CreateGameControl({ addGame }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)} className="mb-2">
        + New Game
      </Button>
      <CreateGameModal
        show={showModal}
        onHide={() => setShowModal(false)}
        addGame={addGame}
      />
    </>
  );
}
