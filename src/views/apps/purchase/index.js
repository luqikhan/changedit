// ** React Imports
import { Fragment } from "react";
// ** Invoice Add Components
import AddCard from "./AddCard";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Alert, Row, Col } from "reactstrap";

const Index = () => {
  

  return (
    <div className="invoice-add-wrapper">
      <Row className="invoice-add">
        <Col>
          <AddCard />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
