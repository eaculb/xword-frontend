import React from "react";

interface Props {
  msg: string | null;
}

export default function Square({ msg }: Props) {
  return (
    <div className="d-flex justify-content-center align-items-center"></div>
  );
}
