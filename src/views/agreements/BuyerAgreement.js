// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import BuyerForm from "./views/BuyerForm";

const BuyerAgreement = () => {
  return (
    <Fragment>
      <Row>
        <Col sm="12" xs="auto" md="auto">
          <BuyerForm />
        </Col>
      </Row>
    </Fragment>
  );
};
export default BuyerAgreement;
