// ** React Imports
import { Fragment, useRef, useState } from "react";

// ** Reactstrap Imports
import { Row, Col, Modal, Button, ModalBody, ModalHeader } from "reactstrap";

import SignaturePad from "./SignaturePad";
import Payment from "./Payment";

const SigningModel = ({ show, setShow }) => {
  // States
  const [signature, setSignature] = useState(null);
  const sigPad = useRef({});

  // ## Signature component function
  const clearSigNature = () => sigPad.clear();
  const saveSignature = () => {
    setSignature(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };
  return (
    <Fragment>
      <Modal isOpen={show} toggle={setShow} className="modal-dialog-centered">
        <ModalHeader className="bg-transparent" toggle={setShow}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">Signing Agreement</h1>
          <Row className="mt-75">
            <Col className="mt-1" xs={12}>
              <Payment />
            </Col>
          </Row>
          <Row className="mt-75">
            <Col className="mt-1" xs={12}>
              <SignaturePad
                sigPad={sigPad}
                clearSigNature={clearSigNature}
                saveSignature={saveSignature}
                signature={signature}
              />
            </Col>
          </Row>

          <Row className="gy-1 gx-2 mt-75">
            <Col className="text-end mt-1" xs={12}>
              <Button type="submit" className="me-1" color="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default SigningModel;
