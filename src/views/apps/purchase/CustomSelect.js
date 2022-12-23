import { Fragment } from "react";

// ** Third Party Components
import Select, { components } from "react-select";
import { Plus } from "react-feather";
import { Button } from "reactstrap";

// ** Reactstrap Imports
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const CustomSelect = ({
  options,
  onChange,
  toggleSidebar,
  value,
  className,
  ...rest
}) => {
  

  // ** DefaultValue function
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === "button") {
      return (
        <Button
          className="text-start rounded-0 px-50"
          color={data.color}
          block
          onClick={() => toggleSidebar()}
        >
          <Plus className="font-medium-1 me-50" />
          <span className="align-middle">{data.label}</span>
        </Button>
      );
    } else {
      return <components.Option {...props}> {data.label} </components.Option>;
    }
  };

  return (
    <Fragment>
      <Select
        className="react-select"
        classNamePrefix="select"
        theme={selectThemeColors}
        options={options}
        value={defaultValue(options, value)}
        components={{
          Option: OptionComponent
        }}
        onChange={(value) => onChange(value)}
        {...rest}
      />
    </Fragment>
  );
};

export default CustomSelect;
