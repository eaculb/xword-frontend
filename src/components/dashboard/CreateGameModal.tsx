import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-formal";
import * as yup from "yup";

import SizePicker from "./SizePicker";
import FormField from "../utils/FormField";

import { Game } from "./Dashboard";

const SIZE_MIN = 5;
const SIZE_MAX = 22;
const SIZE_DEFAULT = 15;

const schema = yup.object({
  title: yup.string(),
  size: yup
    .number()
    .required()
    .default(SIZE_DEFAULT)
    .min(SIZE_MIN)
    .max(SIZE_MAX),
});

interface Props {
  show: boolean;
  onHide: () => void;
  addGame: (game: Game) => void;
}

export default function CreateGameModal({ show, onHide, addGame }: Props) {
  const defaultValue = schema.getDefault();

  let history = useHistory();

  const handleSubmit = ({ title, size }: any) => {
    const id = uuidv4();
    addGame({ id, title, size });
    onHide();
    history.push(`/games/${id}`);
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
          <SizePicker min={SIZE_MIN} max={SIZE_MAX} />
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
