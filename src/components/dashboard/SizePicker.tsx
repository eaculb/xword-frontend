import React from "react";
import Form from "react-formal";

export default function SizePicker() {
  let sizes = [
    { value: "MINI", label: "Mini (5x5)" },
    { value: "MINI_PLUS", label: "Mini Plus (7x7)" },
    { value: "STANDARD", label: "Standard Weekday (15x15)" },
    { value: "STANDARD_PLUS", label: "Standard Plus (16x16)" },
    { value: "SUNDAY", label: "Sunday (21x21)" },
  ];

  return (
    <div className="form-group w-100">
      <label className="form-label w-100">
        Size
        <Form.Field name="size" as="select" className="form-control w-100">
          {sizes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Field>
      </label>
    </div>
  );
}
