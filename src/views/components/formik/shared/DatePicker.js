// ** Third Party Components
import Flatpickr from "react-flatpickr";
import { ErrorMessage, Field } from "formik";

// ** Reactstrap Imports
import { Label } from "reactstrap";

// ** Custom Error Message Imports
import TextError from "./TextError";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

const DatePicker = (props) => {
  const { name, label, ...rest } = props;

  return (
    <>
      <Label className="form-label" for={name}>
        {label && label}
      </Label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <Flatpickr
              className="form-control invoice-edit-input date-picker"
              {...field}
              {...rest}
              id={name}
              value={value}
              onChange={([val]) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default DatePicker;
