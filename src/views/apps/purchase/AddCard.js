// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Custom Components
import FormControl from "@src/views/components/formik/shared/FormControl";

// ** Purchase Custom Select
import CustomSelect from "./CustomSelect";

// ** New Purchase Sidebar
import Sidebar from "./Sidebar";

// ** Third Party Components
import axios from "axios";
import { X, Plus, Hash } from "react-feather";
import { components } from "react-select";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";

const AddCard = () => {
  // ** States
  const [value, setValue] = useState({});
  const [clients, setClients] = useState(null);
  const [selected, setSelected] = useState(null);
  const [picker, setPicker] = useState(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState(false);
  const [dueDatepicker, setDueDatePicker] = useState(new Date());
  const [options, setOptions] = useState([
    {
      value: "add-new",
      label: "Add New Customer",
      type: "button",
      color: "flat-success"
    }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const customerType = [
    { label: "Regular", value: "Regular" },
    { label: "Credit", value: "Credit" }
  ];

  useEffect(() => {
    // ** Get Clients
    axios.get("/api/invoice/clients").then((response) => {
      const arr = options;
      response.data.map((item) =>
        arr.push({ value: item.name, label: item.name })
      );
      setOptions([...arr]);
      setClients(response.data);
    });

    // ** Get Invoices & Set Invoice Number
    axios
      .get("/apps/invoice/invoices", {
        q: "",
        page: 1,
        status: "",
        sort: "asc",
        perPage: 10,
        sortColumn: "id"
      })
      .then((response) => {
        const lastInvoiceNumber = Math.max.apply(
          Math,
          response.data.allData.map((i) => i.id)
        );
        setInvoiceNumber(lastInvoiceNumber + 1);
      });
  }, []);

  //   ** Purchase Form Data
  const initialData = {
    billDate: new Date(),
    dueDate: null,
    distributorId: "",
    invoiceNo: "",
    totalAmount: 0,
    paymentType: "",
    note: "",
    medicines: [
      {
        medicineName: "",
        packageType: "",
        quantityOrPack: 0,
        unit: "",
        batchCode: "",
        quantity: 0,
        expireDate: "",
        gst: 0,
        finalRate: 0,
        mrpOrPack: 0
      }
    ]
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

  // ** Invoice To OnChange
  const handleInvoiceToChange = (data) => {
    setValue(data);
    setSelected(clients.filter((i) => i.name === data.value)[0]);
  };

  const note =
    "It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!";

  return (
    <Fragment>
      <Card className="invoice-preview-card">
        <Formik
          initialValues={initialData}
          onSubmit={(values) => console.log("form data", values)}
        >
          {(formik) => (
            <Form>
              {/* Header */}
              <CardBody className="invoice-padding pb-0">
                <Row className=" invoice-spacing">
                  <Col className="col-bill-to ps-0" xl="8">
                    <h6 className="invoice-to-title">Invoice To:</h6>
                    <div className="invoice-customer">
                      <Fragment>
                        <CustomSelect
                          name="distributorId"
                          value={formik.values.distributorId}
                          options={customerType}
                          toggleSidebar={toggleSidebar}
                          onChange={(value) => {
                            formik.setFieldValue("distributorId", value.value);
                          }}
                        />
                      </Fragment>
                    </div>
                  </Col>

                  <Col className="invoice-number-date mt-md-0 mt-2" xl="4">
                    <div className="d-flex align-items-center justify-content-md-end mb-1">
                      <h4 className="invoice-title">Invoice</h4>
                      <InputGroup className="input-group-merge invoice-edit-input-group disabled">
                        <InputGroupText>
                          <Hash size={15} />
                        </InputGroupText>
                        <FormControl
                          control="input"
                          className="invoice-edit-input"
                          placeholder="53634"
                          name="invoiceNo"
                          optional
                          disabled
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <span className="title">Bill Date:</span>
                      <FormControl name="billDate" control="date" />
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="title">Due Date:</span>
                      <FormControl name="dueDate" control="date" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* /Header */}

              <hr className="invoice-spacing" />
              {/* Product Details */}
              <CardBody className="invoice-padding invoice-product-details">
                <Row className="justify-content-between align-items-center">
                  <Col md={3} className="mb-md-0 mb-1">
                    <FormControl
                      name="medicineName"
                      label="Medicine Name"
                      control="input"
                    />
                  </Col>
                  <Col md={2} className="mb-md-0 mb-1">
                    <FormControl
                      name="packageType"
                      label="Package Type"
                      control="input"
                    />
                  </Col>
                  <Col md={2} className="mb-md-0 mb-1">
                    <FormControl
                      name="medicines.quantityOrPack"
                      label="Qty/Pack"
                      control="input"
                      type="number"
                    />
                  </Col>
                  <Col md={2} className="mb-md-0 mb-1">
                    <FormControl
                      name="medicines.unit"
                      label="Unit"
                      control="input"
                    />
                  </Col>

                  <Col sm={12}>
                    <hr />
                  </Col>
                </Row>
              </CardBody>
              {/* /Product Details */}
            </Form>
          )}
        </Formik>

        {/* Invoice Total */}
        <CardBody className="invoice-padding">
          <Row className="invoice-sales-total-wrapper">
            <Col
              className="mt-md-0 mt-3"
              md={{ size: "6", order: 1 }}
              xs={{ size: 12, order: 2 }}
            >
              <div className="d-flex align-items-center mb-1">
                <Label for="salesperson" className="form-label">
                  Salesperson:
                </Label>
                <Input
                  type="text"
                  className="ms-50"
                  id="salesperson"
                  placeholder="Edward Crowley"
                />
              </div>
            </Col>
            <Col
              className="d-flex justify-content-end"
              md={{ size: "6", order: 2 }}
              xs={{ size: 12, order: 1 }}
            >
              <div className="invoice-total-wrapper">
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Subtotal:</p>
                  <p className="invoice-total-amount">$1800</p>
                </div>
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Discount:</p>
                  <p className="invoice-total-amount">$28</p>
                </div>
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Tax:</p>
                  <p className="invoice-total-amount">21%</p>
                </div>
                <hr className="my-50" />
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Total:</p>
                  <p className="invoice-total-amount">$1690</p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Total */}

        <hr className="invoice-spacing mt-0" />

        {/* Invoice Note */}
        <CardBody className="invoice-padding py-0">
          <Row>
            <Col>
              <div className="mb-2">
                <Label for="note" className="form-label fw-bold">
                  Note:
                </Label>
                <Input type="textarea" rows="2" id="note" defaultValue={note} />
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Note */}
      </Card>

      <Sidebar
        open={sidebarOpen}
        title="Add Distributor"
        toggleSidebar={toggleSidebar}
      />
    </Fragment>
  );
};

export default AddCard;
