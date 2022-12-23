import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

// ** Reactstrap Imports
import { Label, Input } from "reactstrap";

const Checkbox = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <>
      <Field as="checkbox" name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => (
            <Fragment key={option.key}>
              <Input
                type="checkbox"
                value={option.value}
                {...field}
                id={option.value}
                checked={field.value.includes(option.value)}
              />
              <Label className="form-label" for={option.value}>
                {option.key}
              </Label>
            </Fragment>
          ));
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default Checkbox;
