import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

// ** Reactstrap Imports
import { Label, Input } from "reactstrap";

const TextArea = (props) => {
  const { name, label, optional, ...rest } = props;
  return (
    <>
      <Label className="form-label" for={name}>
        {label} {!optional && <span className="text-danger">*</span>}
      </Label>
      <Field as="textarea" id={name} name={name}>
        {({ field }) => {
          return <Input type="textarea" name={name} {...field} {...rest} />;
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default TextArea;
