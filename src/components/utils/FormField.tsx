import React from "react";

import Form, { FieldProps } from "react-formal";

interface Props extends FieldProps {
  name: string;
  hideErrors?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export default function FormField({
  name,
  as,
  hideErrors = false,
  placeholder,
  children,
  ...props
}: Props) {
  return (
    <div className="form-group">
      <label className="form-label w-100">
        {children}
        <Form.Field
          name={name}
          className="form-control"
          placeholder={placeholder}
          {...props}
        />
      </label>
    </div>
  );
}
