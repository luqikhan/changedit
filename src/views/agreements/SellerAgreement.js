// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import SellerForm from "./views/SellerForm";

const SellerAgreement = () => {
  return (
    <Fragment>
      <Row>
        <Col sm="12" xs="auto" md="auto">
          <SellerForm />
        </Col>
      </Row>
    </Fragment>
  );
};

export default SellerAgreement;
