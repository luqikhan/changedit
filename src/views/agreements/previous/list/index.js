// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { FilePlus, Calendar } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UsersList = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Col sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Pending Agreements"
            icon={<Calendar size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Total Agreements"
            icon={<FilePlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default UsersList;
