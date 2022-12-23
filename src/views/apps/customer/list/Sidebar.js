// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import FormControl from "@src/views/components/formik/shared/FormControl";

// ** Third Party Components
import { Form, Formik } from "formik";
import * as Yup from "yup";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Store & Actions
import { addCustomer } from "../store";
import { useDispatch } from "react-redux";

const defaultValues = {
  email: "",
  mobile: "",
  address: "",
  fullName: "",
  customerType: "Regular"
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address"),
  fullName: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  customerType: Yup.string().required("Required"),
  address: Yup.string()
});

const customerType = [
  { label: "Regular", value: "Regular" },
  { label: "Credit", value: "Credit" }
];

const SidebarNewUsers = ({ open, toggleSidebar, title }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  // ** States
  const [initialValue, setInitialValue] = useState(defaultValues);

  // ** Function to handle form submit
  const onSubmit = (data) => {
    toggleSidebar();
    dispatch(
      addCustomer({
        fullName: data.fullName,
        email: data.email,
        customerType: data.customerType,
        mobile: data.mobile,
        address: data.address
      })
    );
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setInitialValue(key, "");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={title}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {(formik) => (
          <Form>
            <div className="mb-1">
              <FormControl
                control="input"
                name="fullName"
                placeholder="John Doe"
                label="Full Name"
              />
            </div>
            <div className="mb-1">
              <FormControl
                control="input"
                name="mobile"
                placeholder="0303-3923920"
                label="Mobile"
              />
            </div>
            <div className="mb-1">
              <FormControl
                control="input"
                name="email"
                placeholder="john.doe@example.com"
                optional
                label="Email"
              />
            </div>
            <div className="mb-1">
              <FormControl
                control="select"
                type="select"
                name="customerType"
                options={customerType}
                label="Customer Type"
              />
            </div>
            <div className="mb-1">
              <FormControl
                control="input"
                name="address"
                label="Address"
                optional
                placeholder="123 Main St"
              />
            </div>
            <Button type="submit" className="me-1" color="primary">
              Submit
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={toggleSidebar}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
};

export default SidebarNewUsers;
