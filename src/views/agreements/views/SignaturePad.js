// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import SignatureCanvas from "react-signature-canvas";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

const SignaturePad = ({ sigPad, clearSigNature, saveSignature }) => {
  console.log("ref", sigPad);
  return (
    <Fragment>
      <SignatureCanvas
        canvasProps={{
          width: 360,
          height: 200,
          style: { border: "1px solid grey" }
        }}
        ref={(ref) => {
          sigPad = ref;
        }}
      />
      <Row className="mt-65">
        <Col className="text-start mt-1" xs={12}>
          <Button
            className="me-1"
            color="success"
            outline
            onClick={saveSignature}
          >
            Save
          </Button>
          <Button color="secondary" outline onClick={clearSigNature}>
            Clear
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignaturePad;
