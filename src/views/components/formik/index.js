import React from "react";
import { Formik } from "formik";

const FormContainer = (props) => {
  const { initialValues, validationSchema, onSubmit, children } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {children}
    </Formik>
  );
};

export default FormContainer;
