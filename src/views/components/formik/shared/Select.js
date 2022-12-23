import { Field, ErrorMessage } from "formik";
import TextError from "../index";

// ** Reactstrap Imports
import { Label, Input } from "reactstrap";
import CustomInput from "./CustomInput";

const Select = (props) => {
  const { name, label, options, optional, ...rest } = props;
  return (
    <>
      <Label className="form-label" for={name}>
        {label} {!optional && <span className="text-danger">*</span>}
      </Label>
      <Field as="select" name={name} {...rest} component={CustomInput}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default Select;
