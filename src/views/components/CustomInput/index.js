// ** Reactstrap Imports
import { Input, FormFeedback } from "reactstrap";

export const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <>
      <Input
        {...field}
        {...props}
        invalid={touched[field.name] && errors[field.name] && true}
        autoComplete="off"
      />
      {touched[field.name] && errors[field.name] && (
        <FormFeedback>{errors[field.name]}</FormFeedback>
      )}
    </>
  );
};
