// ** Reactstrap Imports
import { Input, FormText } from "reactstrap";

const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <>
      <Input
        {...props}
        {...field}
        invalid={touched[field.name] && errors[field.name]}
      />
      {touched[field.name] && errors[field.name] && (
        <FormText>{errors[field.name]}</FormText>
      )}
    </>
  );
};

export default CustomInput;
