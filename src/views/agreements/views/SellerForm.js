// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Input,
  FormFeedback
} from "reactstrap";

// Custom component
import PlaceAutoComplete from "./PlaceAutoComplete";

// ** Third Party Components
import { Formik, Form, Field, ErrorMessage } from "formik";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { CustomInput } from "../../components/CustomInput";
import { geocodeByAddress } from "react-places-autocomplete";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import axios from "axios";

const initialValues = {
  buyerName: "",
  companyName: "",
  gstNumber: "",
  nzbnNumber: "",
  buyerEmail: "",
  address: "",
  plateNumber: "",
  buyerType: "Person",
  pickupDate: new Date(),
  purchasePrice: 0,
  carMileage: 0,
  moneyOwed: "No",
  logoFile: null
};

const buyerTypeOptions = [
  { key: "Person", value: "Person" },
  { key: "Company", value: "Company" }
];

const moneyOwedOptions = [
  { key: "No", value: "No" },
  { key: "Yes", value: "Yes" }
];

// const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const BuyerSchema = Yup.object().shape({
  buyerName: Yup.string().when("buyerType", {
    is: "Person",
    then: Yup.string().required("Name is required")
  }),
  companyName: Yup.string().when("buyerType", {
    is: "Company",
    then: Yup.string().required("Name is required")
  }),
  gstNumber: Yup.string().when("buyerType", {
    is: "Company",
    then: Yup.string().required("GST number is required")
  }),
  nzbnNumber: Yup.string().when("buyerType", {
    is: "Company",
    then: Yup.string().required("NZBN number is required")
  }),
  buyerEmail: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  plateNumber: Yup.string().required("License is required"),
  purchasePrice: Yup.number().required("Price is required"),
  carMileage: Yup.number().required("Current Km's is required"),
  pickupDate: Yup.date().required("Pickup date is required"),
  logoFile: Yup.mixed()
    .nullable()
    .required("A file is required")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
});

const SellerForm = () => {
  const handleSubmit = async (values, actions) => {
    try {
      console.log("form values", values);
      const plateConfigData = {
        Credentials: {
          SubscriberID: "VISN",
          UserID: "visnb2buser",
          UserKey: "JrtWHw9rWr2eH6F9eh3hTKAm"
        },
        SubscriberReference: "1cf326dc-b39f-49c6-bb72-b81b25ec4ee4",
        ReasonForAccess: "RA08",
        AddOns: [
          { AddOnCode: "FuelSafetyDetails" },
          { AddOnCode: "PPSR-SecuritySearch" }
        ],
        SearchVehicle: { PlateNumber: "P5829" }
      };

      const plateResponse = await axios.post(
        "https://test2.centrix.co.nz/veriphi/V2/CentrixRestPort.svc/WheelsService/V1/DoWheelsSearchWithOptions",
        plateConfigData
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Seller Form</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={initialValues}
          // validationSchema={BuyerSchema}
          onSubmit={async (values, actions) =>
            await handleSubmit(values, actions)
          }
        >
          {(formik) => {
            const {
              values: { buyerType },
              setFieldValue,
              touched,
              errors
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
                          id={option.key}
                        />
                        <Label
                          className="form-check-label"
                          for={`${option.key}`}
                        >
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
                      <Label className="form-label" for="buyerName">
                        Buyer Name
                      </Label>
                      <Field
                        name="buyerName"
                        placeholder="Buyer Name"
                        component={CustomInput}
                      />
                    </Col>
                  )}

                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="carRegistrationAddress">
                      Registered Car Address
                    </Label>
                    <Field name="address">
                      {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                          <PlaceAutoComplete
                            id="address"
                            {...field}
                            value={value}
                            handleSelect={async (val) => {
                              const result = await geocodeByAddress(val);
                              setFieldValue("address", val);
                            }}
                            onChange={(val) => setFieldValue("address", val)}
                          />
                        );
                      }}
                    </Field>
                    <ErrorMessage name="address" />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="buyerEmail">
                      Buyer Email
                    </Label>
                    <Field
                      type="email"
                      name="buyerEmail"
                      placeholder="Email"
                      component={CustomInput}
                    />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="plateNumber">
                      Plate Number
                    </Label>
                    <Field
                      name="plateNumber"
                      placeholder="Plate Number"
                      component={CustomInput}
                    />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="purchasePrice">
                      Purchase Price
                    </Label>
                    <Field
                      name="purchasePrice"
                      placeholder="Purchase Price"
                      type="number"
                      component={CustomInput}
                    />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="carMileage">
                      Current Km's
                    </Label>
                    <Field
                      name="carMileage"
                      type="number"
                      placeholder="What is the Current Km's?"
                      component={CustomInput}
                    />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="pickupDate">
                      Pickup Date
                    </Label>
                    <Field name="pickupDate">
                      {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                          <Flatpickr
                            className="form-control invoice-edit-input date-picker"
                            id="pickupDate"
                            {...field}
                            value={value}
                            onChange={([val]) =>
                              setFieldValue("pickupDate", val)
                            }
                          />
                        );
                      }}
                    </Field>
                    <ErrorMessage name="dateOfBirth" />
                  </Col>
                  <Col sm="12" xl="6" md="6" className="mb-1">
                    <Label className="form-label" for="logoFile">
                      Upload Image
                    </Label>
                    <Input
                      type="file"
                      name="logoFile"
                      invalid={touched.logoFile && errors.logoFile && true}
                      onChange={(e) => {
                        setFieldValue("logoFile", e.currentTarget.files[0]);
                      }}
                    />
                    {touched.logoFile && errors.logoFile ? (
                      <FormFeedback>{errors.logoFile}</FormFeedback>
                    ) : null}
                  </Col>
                  <Col
                    sm="12"
                    xl="6"
                    md="6"
                    className="demo-inline-spacing mb-1"
                  >
                    <Label className="form-label" for="moneyOwed">
                      Is there any money owed?
                    </Label>
                    {moneyOwedOptions.map((option) => (
                      <div className="form-check" key={option.key}>
                        <Field
                          name="moneyOwed"
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


export default SellerForm;
