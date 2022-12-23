// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader
} from "reactstrap";

// ** Third Party Components
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../../components/CustomInput";
import PlaceAutoComplete from "./PlaceAutoComplete";

const initialValues = {
  sellerName: "",
  companyName: "",
  gstNumber: "",
  nzbnNumber: "",
  sellerEmail: "",
  carRegistrationAddess: "",
  numberPlate: "",
  buyerType: "Person"
};

const buyerTypeOptions = [
  { key: "Person", value: "Person" },
  { key: "Company", value: "Company" }
];

const BuyerSchema = Yup.object().shape({
  sellerName: Yup.string().when("buyerType", {
    is: "Person",
    then: Yup.string().required("Name is required")
  }),
  companyName: Yup.string().when("buyerType", {
    is: "Company",
    then: Yup.string().required("Company name is required")
  }),
  gstNumber: Yup.string().when("buyerType", {
    is: "Company",
    then: Yup.string().required("GST number is required")
  }),
  nzbnNumber: Yup.string().when("buyerType", {
    is: "Company",
    then: Yup.string().required("NZBN number is required")
  }),
  sellerEmail: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  carRegistrationAddress: Yup.string().required(
    "Registrated Address is required"
  ),
  numberPlate: Yup.string().required("License is required")
});

const BuyerForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Buyer Form</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={BuyerSchema}
          onSubmit={(values) => console.log("form data", values)}
        >
          {(formik) => {
            const {
              values: { buyerType }
            } = formik;

            return (
              <Form>
                <Row>
                  <Col sm="12" className="demo-inline-spacing mb-1">
                    <Label className="form-label" for="buyerType">
                      Buy for a Person or Company
                    </Label>
                    {buyerTypeOptions.map((option) => (
                      <div className="form-check" key={option.key}>
                        <Field
                          name="buyerType"
                          type="radio"
                          component={CustomInput}
                          value={option.value}
                        />
                        <Label className="form-label" for={`${option.key}`}>
                          {option.key}
                        </Label>
                      </div>
                    ))}
                  </Col>
                  {buyerType === "Company" ? (
                    <>
                      <Col sm="12" xl="6" md="6" className="mb-1">
                        <Label className="form-label" for="companyName">
                          Company Name
                        </Label>
                        <Field
                          name="companyName"
                          placeholder="Company Name"
                          component={CustomInput}
                        />
                      </Col>
                      <Col sm="12" xl="6" md="6" className="mb-1">
                        <Label className="form-label" for="gstNumber">
                          GST Number
                        </Label>
                        <Field
                          name="gstNumber"
                          placeholder="GST Number"
                          component={CustomInput}
                        />
                      </Col>
                      <Col sm="12" xl="6" md="6" className="mb-1">
                        <Label className="form-label" for="nzbnNumber">
                          NZBN Number
                        </Label>
                        <Field
                          name="nzbnNumber"
                          placeholder="NZBN Number"
                          component={CustomInput}
                        />
                      </Col>
                    </>
                  ) : (
                    <Col sm="12" xl="6" md="6" className="mb-1">
                      <Label className="form-label" for="sellerName">
                        Seller Name
                      </Label>
                      <Field
                        name="sellerName"
                        placeholder="Seller Name"
                        component={CustomInput}
                      />
                    </Col>
                  )}
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="carRegistrationAddress">
                      Registered Car Address
                    </Label>
                    <PlaceAutoComplete />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="sellerEmail">
                      Seller Email
                    </Label>
                    <Field
                      type="email"
                      name="sellerEmail"
                      placeholder="Email"
                      component={CustomInput}
                    />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="numberPlate">
                      Number Plate
                    </Label>
                    <Field
                      name="numberPlate"
                      placeholder="Number Plate"
                      component={CustomInput}
                    />
                  </Col>

                  <Col sm="12">
                    <div className="d-flex">
                      <Button className="me-1" color="primary" type="submit">
                        Submit
                      </Button>
                      <Button outline color="secondary" type="reset">
                        Reset
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default BuyerForm;
