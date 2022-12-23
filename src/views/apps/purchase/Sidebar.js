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
// import { addCustomer } from "../store";
import { useDispatch } from "react-redux";

const defaultValues = {
  email: "",
  mobile: "",
  address: "",
  fullName: "",
  company: ""
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address"),
  fullName: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  company: Yup.string(),
  address: Yup.string()
});

const SidebarNewDistributor = ({ open, toggleSidebar, title }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  // ** States
  const [initialValue, setInitialValue] = useState(defaultValues);

  // ** Function to handle form submit
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 400);
    toggleSidebar();
    // dispatch(
    //   addCustomer({
    //     fullName: data.fullName,
    //     email: data.email,
    //     customerType: data.customerType,
    //     mobile: data.mobile,
    //     address: data.address
    //   })
    // );
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
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {({ isValid, isSubmitting }) => (
          <Form autoComplete="off">
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
                placeholder="+923033923920"
                label="Mobile"
              />
            </div>
            <div className="mb-1">
              <FormControl
                control="input"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                optional
                label="Email"
              />
            </div>
            <div className="mb-1">
              <FormControl
                control="input"
                name="company"
                label="Compnay"
                optional
                placeholder="E.x Abc Corp"
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
            <Button
              type="submit"
              className="me-1"
              color="primary"
              disabled={!isValid}
            >
              {isSubmitting ? "Loading..." : "Submit"}
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

export default SidebarNewDistributor;
