import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-formal";
import * as yup from "yup";

import SizePicker from "./SizePicker";
import FormField from "../utils/FormField";

import { GAME_META } from "./Dashboard";
import { CreateGame, CreateGameVariables } from "./__generated__/CreateGame";

export const CREATE_GAME = gql`
  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      success
      message
      game {
        id
        title
        size
      }
    }
  }
`;

const schema = yup.object({
  title: yup.string(),
  size: yup.string().required().default("STANDARD"),
});

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function CreateGameModal({ show, onHide }: Props) {
  const defaultValue = schema.getDefault();

  let history = useHistory();

  const [createGame] = useMutation<CreateGame, CreateGameVariables>(
    CREATE_GAME,
    {
      update: (cache, { data }) => {
        if (!data) {
          return;
        }
        const newGame = data.createGame.game;
        cache.modify({
          fields: {
            games: (currGameList = []) => {
              const newGameRef = cache.writeFragment({
                data: newGame,
                fragment: GAME_META,
              });
              return [newGameRef, ...currGameList];
            },
          },
        });
      },
      onCompleted: (data) => {
        onHide();
        if (data && data.createGame.success && data.createGame.game) {
          history.push(`/games/${data.createGame.game.id}`);
        }
      },
    }
  );

  const handleSubmit = async ({ title, size }: any) => {
    await createGame({
      variables: { input: { title, size } },
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form schema={schema} defaultValue={defaultValue} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormField name="title" type="text">
            Title
          </FormField>
          <SizePicker />
        </Modal.Body>
        <Modal.Footer>
          <Form.Submit as={Button} variant="primary" type="submit">
            Create
          </Form.Submit>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
