// ** React Imports
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Custom Hooks
import useJwt from "@src/auth/jwt/useJwt";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { handleLogin } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import { CustomInput } from "../../components/CustomInput";

// ** Third Party Components
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import { toast, Slide } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { formatDate } from "@fullcalendar/react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Label,
  Button,
  FormFeedback
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const initialValues = {
  name: "",
  phone: "",
  drivingLicense: "",
  dateOfBirth: new Date(),
  email: "",
  password: "",
  terms: false
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  drivingLicense: Yup.string().required("License is required"),
  dateOfBirth: Yup.date().required("Birthday is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  terms: Yup.bool() // use bool instead of boolean
    .oneOf([true], "You must accept the terms and conditions")
});

const Register = () => {
  // ** Hooks
  const Ability = useContext(AbilityContext);
  const history = useHistory();
  const dispatch = useDispatch();

  // save user to database
  function writeUser(user) {
    const ref = doc(db, "users", user.uid);
    const docRef = setDoc(ref, { ...user }).catch((e) =>
      console.log("user saving error", e.message)
    );
  }

  const onSubmit = (data, actions) => {
    const tempData = { ...data };
    delete tempData.terms;
    {
      const { name, email, phone, drivingLicense, dateOfBirth, password } =
        data;

      useJwt
        .register({
          email,
          password,
          returnSecureToken: true
        })
        .then((res) => {
          const user = {
            name,
            email: res.data.email,
            uid: res.data.localId,
            phone,
            birthday: formatDate(dateOfBirth),
            license: drivingLicense,
            role: "user",
            ability: [
              {
                action: "manage",
                subject: "all"
              }
            ]
          };
          const data = {
            ...user,
            accessToken: res.data.idToken,
            refreshToken: res.data.refreshToken
          };
          const userData = {
            name: user.name,
            uid: user.uid,
            phone: user.phone,
            email: user.email,
            birthday: user.birthday,
            license: user.license
          };
          writeUser(userData);
          Ability.update(user.ability);
          dispatch(handleLogin(data));
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.error.message || error.message, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          });
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    }
  };

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <h2 className="brand-text text-primary ms-1">Changedit</h2>
            </Link>
            <CardTitle tag="h4" className="mb-1">
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your agreements easy and fun!
            </CardText>
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values, actins) => onSubmit(values, actins)}
            >
              {(formik) => {
                const { isSubmitting, errors } = formik;
                return (
                  <Form className="auth-register-form mt-2">
                    <div className="mb-1">
                      <Label className="form-label" for="name">
                        Name
                      </Label>
                      <Field
                        name="name"
                        placeholder="john due"
                        component={CustomInput}
                      />
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="email">
                        Email
                      </Label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        component={CustomInput}
                      />
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="phone">
                        Phone
                      </Label>
                      <Field name="phone" component={CustomInput} />
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="drivingLicense">
                        Driving License
                      </Label>
                      <Field name="drivingLicense" component={CustomInput} />
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="drivingLicense">
                        Birthday
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
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="register-password">
                        Password
                      </Label>
                      <Field name="password">
                        {({ field, meta }) => (
                          <>
                            <InputPasswordToggle
                              {...field}
                              className="input-group-merge"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.touched && meta.error && (
                              <FormFeedback>{meta.error}</FormFeedback>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="form-check mb-1">
                      <Field
                        as="checkbox"
                        type="checkbox"
                        name="terms"
                        component={CustomInput}
                      />
                      <Label className="form-check-label" for="terms">
                        I agree to
                        <a
                          className="ms-25"
                          href="/"
                          onClick={(e) => e.preventDefault()}
                        >
                          privacy policy & terms
                        </a>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      disabled={errors && isSubmitting}
                      color="primary"
                      block
                    >
                      {isSubmitting ? "Loading..." : "Sign up"}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
