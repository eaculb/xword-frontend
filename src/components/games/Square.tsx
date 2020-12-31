import React, { MouseEvent, KeyboardEvent, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";

import { SquareDetail } from "./__generated__/SquareDetail";
import {
  UpdateSquare,
  UpdateSquareVariables,
} from "./__generated__/UpdateSquare";

const STANDARD_FONT_SIZE = 16;
// Size in rem
const SQUARE_SIZE = 2;
const MINI_SQUARE_SIZE = 2.4;

const SELECTED_COLOR = "gold";
const SECONDARY_SELECTED_COLOR = "lightblue";

export const BLACK = "_BLACK";
const BACKSPACE = "Backspace";
const DELETE = "Delete";

export const SQUARE_DETAIL = gql`
  fragment SquareDetail on Square {
    id
    index
    char
  }
`;

export const UPDATE_SQUARE = gql`
  mutation UpdateSquare($input: UpdateSquareInput!) {
    updateSquare(input: $input) {
      success
      message
      square {
        ...SquareDetail
      }
    }
  }
  ${SQUARE_DETAIL}
`;

interface BorderProps {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
  secondary?: boolean;
  writeable?: boolean;
}

interface SizedSquareProps extends BorderProps {
  active: boolean;
  squareSize: number;
  adjustedFontSize: number;
}

const dynamicSquareProperties = ({
  squareSize,
  adjustedFontSize,
  top,
  left,
  bottom,
  right,
  active,
  secondary,
  writeable,
}: SizedSquareProps) => {
  let style: Record<string, string> = {
    fontSize: `${adjustedFontSize}px`,
    width: `${squareSize}rem`,
    height: `${squareSize}rem`,
  };
  if (top) {
    style.borderTop = "solid 2px";
  }
  if (left) {
    style.borderLeft = "solid 2px";
  }
  if (bottom) {
    style.borderBottom = "solid 2px";
  }
  if (right) {
    style.borderRight = "solid 2px";
  }
  if (!writeable) {
    style.backgroundColor = "black";
  } else if (active) {
    style.backgroundColor = SELECTED_COLOR;
  } else if (secondary) {
    style.backgroundColor = SECONDARY_SELECTED_COLOR;
  }

  return style;
};

const SizedSquare = styled.div`
  &:focus {
    outline: none;
  }

  display: flex;
  text-align: center;
  padding: 2px;
  justify-content: center;
  align-items: center;
  border-top: solid 1px;
  border-left: solid 1px;
  word-break: break-word;
  ${dynamicSquareProperties};
`;

interface Props extends BorderProps {
  gameId: string;
  size: number;
  enforceSymmetry: boolean;
  square: SquareDetail;
  setSelectedIx: (index: number) => void;
  toggleIsAcross: () => void;
  selectedIx: number;
}

const calcFontSize = ({ length }: string) => {
  if (length > 10) {
    return (STANDARD_FONT_SIZE * 0.5) | 0;
  }
  if (length > 3) {
    return (STANDARD_FONT_SIZE * 0.75) | 0;
  }
  return STANDARD_FONT_SIZE;
};

export default function Square({
  gameId,
  size,
  enforceSymmetry,
  square: { id, index, char },
  setSelectedIx,
  toggleIsAcross,
  selectedIx,
  ...props
}: Props) {
  const gameSize = size * size;

  const [updateCharBase, { data }] = useMutation<
    UpdateSquare,
    UpdateSquareVariables
  >(UPDATE_SQUARE);

  const updateChar = enforceSymmetry
    ? (char: string | null) => {
        updateCharBase({
          variables: {
            input: {
              index,
              gameId,
              char,
            },
          },
        });
        updateCharBase({
          variables: {
            input: {
              index: gameSize - (index + 1),
              gameId,
              char,
            },
          },
        });
      }
    : (char: string | null) => {
        updateCharBase({
          variables: {
            input: {
              index,
              gameId,
              char,
            },
          },
        });
      };

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.ctrlKey) {
        if (char === BLACK) {
          updateChar(null);
        } else {
          updateChar(BLACK);
        }
      } else {
        if (selectedIx === index) {
          toggleIsAcross();
        }
      }
    },
    [char, updateChar, index, selectedIx, setSelectedIx, toggleIsAcross]
  );

  function handleKeyUp({ key }: KeyboardEvent) {
    const isAlpha = /^[a-z]$/i.test(key);
    if (isAlpha) {
      updateCharBase({
        variables: {
          input: {
            index,
            gameId,
            char: key.toUpperCase(),
          },
        },
      });
    } else if (key === BACKSPACE || key === DELETE) {
      updateCharBase({
        variables: {
          input: {
            index,
            gameId,
            char: null,
          },
        },
      });
    }
  }

  const writeable = char !== BLACK;
  const adjustedFontSize =
    char && char.length > 0 ? calcFontSize(char) : STANDARD_FONT_SIZE;
  const squareSize = size > 10 ? SQUARE_SIZE : MINI_SQUARE_SIZE;

  return (
    <SizedSquare
      {...props}
      id={id}
      active={index === selectedIx}
      squareSize={squareSize}
      adjustedFontSize={adjustedFontSize}
      onMouseDown={handleClick}
      onFocus={() => setSelectedIx(index)}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      writeable={writeable}
    >
      {writeable && char}
    </SizedSquare>
  );
}
