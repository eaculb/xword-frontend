import React from "react";

import Form, { useField } from "react-formal";

interface Props {
  min: number;
  max: number;
}

export default function SizePicker({ min, max }: Props) {
  const [props, _meta] = useField({
    name: "size",
    type: "range",
  });
  return (
    <div className="form-group w-100">
      <label className="form-label w-100">
        Puzzle Size: {props.value}
        <Form.Field
          {...props}
          className="form-control w-100"
          min={min.toString()}
          max={max.toString()}
        />
      </label>
    </div>
  );
}
