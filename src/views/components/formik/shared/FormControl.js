// Form Components
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Radio from "./Radio";
import Select from "./Select";
import FilePicker from "./FilePicker";
import Input from "./Input";
import TextArea from "./TextArea";

const FormControl = (props) => {
  

  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "file":
      return <FilePicker {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
