import React from "react";
import { Field } from "formik";
import CustomInput from "./CustomInput";

// ** Reactstrap Imports
import { Label,  } from "reactstrap";

const InputField = (props) => {
  const { name, label, optional, ...rest } = props;
  return (
    <>
      <Label className="form-label" for={name}>
        {label} {!optional && <span className="text-danger">*</span>}
      </Label>
      <Field name={name} component={CustomInput} {...rest} />
    </>
  );
};

export default InputField;
