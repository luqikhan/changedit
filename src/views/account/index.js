// ** React Imports
import { useEffect, useState } from "react";
// import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Account View Components
import AccountInfoCard from "./AccountInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";

const AccountView = () => {
  // ** State
  const [userData, setUserData] = useState(null);

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  return (
    <div className="app-user-view">
      <Row>
        <Col>
          <AccountInfoCard userData={userData} />
        </Col>
      </Row>
    </div>
  );
};

export default AccountView;
