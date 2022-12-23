// ** React Imports
import { useEffect } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import axios from "axios";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** Invoice Preview Components
import PreviewCard from "../views/PreviewCard";

// ** Styles
import "@styles/base/pages/app-invoice.scss";

const AgreementPreview = () => {
  // ** HooksVars
  // const { id } = useParams();

  // ** States
  // const [data, setData] = useState(null);
  //    const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  //    const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  const data = {
    invoice: {
      id: 4990,
      issuedDate: "06 Mar 2020",
      client: {
        address: "19022 Clark Parks Suite 149",
        company: "Smith, Miller and Henry LLC",
        companyEmail: "mejiageorge@lee-perez.com",
        country: "Cambodia",
        contact: "(832) 323-6914",
        name: "Kevin Patton"
      },
      service: "Software Development",
      total: 4749,
      avatar: require("@src/assets/images/avatars/9-small.png").default,
      invoiceStatus: "Sent",
      balance: 0,
      dueDate: "11 Feb 2020"
    },
    paymentDetails: {
      totalDue: "$12,110.55",
      bankName: "American Bank",
      country: "United States",
      iban: "ETD95476213874685",
      swiftCode: "BR91905"
    }
  };

  // ** Get invoice on mount based on id
  // useEffect(() => {
  //   axios.get(`/api/agreements/agreement/${1}`).then(() => {
  //     setData(response.data);
  //   });
  // }, []);

  return data !== null ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col sm={12}>
          <PreviewCard data={data} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Invoice not found</h4>
      <div className="alert-body">
        Invoice with id: {id} doesn't exist. Check list of all invoices:{" "}
        <Link to="/apps/invoice/list">Invoice List</Link>
      </div>
    </Alert>
  );
};

export default AgreementPreview;
