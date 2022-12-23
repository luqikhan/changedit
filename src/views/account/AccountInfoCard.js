// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  Label,
  ModalBody,
  ModalHeader
} from "reactstrap";

// ** Third Party Components
import Flatpickr from "react-flatpickr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from "@components/avatar";
import { CustomInput } from "../components/CustomInput";

// ** Utils
import { getUserData } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  license: "",
  dateOfBirth: new Date()
};

const accountSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  license: Yup.string().required("License is required"),
  dateOfBirth: Yup.date()
});

const AccountInfoCard = () => {
  // ** State
  const [show, setShow] = useState(false);

  const { userData } = getUserData();

  console.log("user data", userData);

  // const onSubmit = (data) => {}

  // ** render user img
  const renderUserImg = () => {
    if (userData !== null && userData.avatar) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={userData.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          "light-success",
          "light-danger",
          "light-warning",
          "light-info",
          "light-primary",
          "light-secondary"
        ],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="rounded mt-3 mb-2"
          content={userData !== null ? userData.name : ""}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%"
          }}
          style={{
            height: "110px",
            width: "110px"
          }}
        />
      );
    }
  };

  const handleReset = () => {
    // reset({
    //    username: userData.username,
    //    lastName: userData.fullName.split(' ')[1],
    //    firstName: userData.fullName.split(' ')[0]
    // })
  };

  let userValues = {};
  if (userData !== null) {
    userValues = {
      fullName: userData.name,
      email: userData.email,
      license: userData.license,
      phone: userData.phone,
      dateOfBirth: userData.birthday
    };
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{userData !== null && userData.name}</h4>
                </div>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
          <div className="info-container">
            {userData !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Username:</span>
                  <span>{userData.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{userData.email}</span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">License:</span>
                  <span>{userData.license}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Contact:</span>
                  <span>{userData.phone}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Date Of Birth:</span>
                  <span>{userData.birthday}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit Account Information</h1>
          </div>
          <Formik
            initialValues={userData !== null ? userValues : initialValues}
            validationSchema={accountSchema}
          >
            {() => (
              <Form>
                <Row className="gy-1 pt-75">
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="firstName">
                      Full Name
                    </Label>
                    <Field
                      name="fullName"
                      component={CustomInput}
                      placeholder="Full Name"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Field
                      name="email"
                      type="email"
                      component={CustomInput}
                      placeholder="Email"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="phone">
                      Phone
                    </Label>
                    <Field
                      name="phone"
                      placeholder="Phone"
                      component={CustomInput}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="license">
                      License
                    </Label>
                    <Field
                      name="license"
                      placeholder="License"
                      component={CustomInput}
                    />
                  </Col>
                  <Col xs={12}>
                    <Label className="form-label" for="dateOfBirth">
                      Date of Birth
                    </Label>
                    <Field name="dateOfBirth">
                      {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                          <Flatpickr
                            className="form-control invoice-edit-input date-picker"
                            id="dateOfBirth"
                            {...field}
                            value={value}
                            onChange={([val]) =>
                              setFieldValue("dateOfBirth", val)
                            }
                          />
                        );
                      }}
                    </Field>
                    <ErrorMessage name="dateOfBirth" />
                  </Col>

                  <Col xs={12} className="text-center mt-2 pt-50">
                    <Button type="submit" className="me-1" color="primary">
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      color="secondary"
                      outline
                      onClick={() => {
                        handleReset();
                        setShow(false);
                      }}
                    >
                      Discard
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AccountInfoCard;
