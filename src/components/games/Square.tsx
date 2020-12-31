import React, {
  MouseEvent,
  KeyboardEvent,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";

import { SquareDetail } from "./__generated__/SquareDetail";
import {
  UpdateSquare,
  UpdateSquareVariables,
} from "./__generated__/UpdateSquare";

const STANDARD_FONT_SIZE = 16;
// Size in rem
const SQUARE_SIZE = 3;
const SELECTED_COLOR = "#D6EAF8";
const BLACK = "_BLACK";

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
  active?: boolean;
  writeable?: boolean;
}

interface SizedSquareProps extends BorderProps {
  adjustedFontSize: number;
}

const dynamicSquareProperties = ({
  adjustedFontSize,
  top,
  left,
  bottom,
  right,
  active,
  writeable,
}: SizedSquareProps) => {
  let style: Record<string, string> = {
    fontSize: `${adjustedFontSize}px`,
    width: `${SQUARE_SIZE}rem`,
    height: `${SQUARE_SIZE}rem`,
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
  if (active) {
    style.backgroundColor = SELECTED_COLOR;
  }
  if (!writeable) {
    style.backgroundColor = "black";
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
  gameSize: number;
  enforceSymmetry: boolean;
  square: SquareDetail;
  setSelectedIx: (index: number) => void;
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
  gameSize,
  enforceSymmetry,
  square: { index, char },
  setSelectedIx,
  ...props
}: Props) {
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
        setSelectedIx(index);
      }
    },
    [char]
  );

  function handleKeyPress(e: KeyboardEvent) {
    updateCharBase({
      variables: {
        input: {
          index,
          gameId,
          char: e.key,
        },
      },
    });
  }

  const writeable = char !== BLACK;
  const adjustedFontSize =
    char && char.length > 0 ? calcFontSize(char) : STANDARD_FONT_SIZE;

  return (
    <SizedSquare
      adjustedFontSize={adjustedFontSize}
      {...props}
      onClick={handleClick}
      onFocus={() => setSelectedIx(index)}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      writeable={writeable}
    >
      {writeable && char}
    </SizedSquare>
  );
}
