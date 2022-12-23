// ** React Imports
import { useContext, Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Icons Imports
import { Coffee } from "react-feather";
// import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import { CustomInput } from "../../components/CustomInput";
import Avatar from "@components/avatar";

// ** Actions
import { handleLogin } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Third Party Components
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  // Form,
  Label,
  Input,
  Button,
  FormFeedback
} from "reactstrap";

// ** Custom Hooks
import useJwt from "@src/auth/jwt/useJwt";

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils";
import { db } from "../../..";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const ToastContent = ({ name }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an user to Changit. Now you can start
        to explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const Login = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const ability = useContext(AbilityContext);

  const initialValues = {
    email: "",
    password: ""
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const onSubmit = (data, actions) => {
    useJwt
      .login({
        email: data.email,
        password: data.password,
        returnSecureToken: true
      })
      .then((res) => {
        getDoc(doc(db, "users", res.data.localId))
          .then((userSnapshot) => {
            const user = userSnapshot.data();
            user.role = "admin";
            user.ability = [
              {
                action: "manage",
                subject: "all"
              }
            ];
            {
              const data = {
                userData: user,
                accessToken: res.data.idToken,
                refreshToken: res.data.refreshToken
              };
              dispatch(handleLogin(data));

              ability.update(data.userData.ability);
              history.push(getHomeRouteForLoggedInUser(data.userData.role));
              toast.success(<ToastContent name={data.userData.name} />, {
                icon: false,
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
              });
            }
          })
          .catch((e) => console.log(e.message));
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
              {/* <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg> */}
              <h2 className="brand-text text-primary ms-1">Changedit</h2>
            </Link>
            <CardTitle tag="h4" className="mb-1">
              Welcome to Changedit! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => onSubmit(values, actions)}
            >
              {(formik) => {
                const { isSubmitting } = formik;
                return (
                  <Form className="auth-login-form mt-2">
                    <div className="mb-1">
                      <Label className="form-label" for="email">
                        Email
                      </Label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        autoFocus
                        component={CustomInput}
                      />
                    </div>
                    <div className="mb-1">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label" for="password">
                          Password
                        </Label>
                        <Link to="/pages/forgot-password-basic">
                          <small>Forgot Password?</small>
                        </Link>
                      </div>
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
                      <Input type="checkbox" id="remember-me" />
                      <Label className="form-check-label" for="remember-me">
                        Remember Me
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      color="primary"
                      block
                    >
                      {isSubmitting ? "Loading..." : "Sign in"}
                    </Button>
                  </Form>
                );
              }}
            </Formik>

            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
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

export default Login;
