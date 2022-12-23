// ** Table Actions Imports
import Actions from "./Actions";

// ** Reactstrap Imports
import { Badge } from "reactstrap";

const statusObj = {
  walking: "light-warning",
  Credit: "light-success",
  Regular: "light-secondary"
};

export const columns = [
  {
    name: "No",
    minWidth: "130px",
    sortable: false,
    sortField: "id",
    selector: (row) => row.id,
    cell: (row) => <span className="text-capitalize">{row.id}</span>
  },
  {
    name: "Name",
    sortable: true,
    minWidth: "280px",
    sortField: "fullName",
    selector: (row) => row.fullName,
    cell: (row) => <span className="fw-bolder">{row.fullName}</span>
  },
  {
    name: "Mobile",
    minWidth: "230px",
    sortable: true,
    sortField: "mobile",
    selector: (row) => row.mobile,
    cell: (row) => <span className="text-capitalize">{row.mobile}</span>
  },
  {
    name: "Email",
    minWidth: "280px",
    sortable: true,
    sortField: "email",
    selector: (row) => row.email,
    cell: (row) => <span className="text-capitalize">{row.email}</span>
  },
  {
    name: "Status",
    minWidth: "138px",
    sortable: true,
    sortField: "customerType",
    selector: (row) => row.customerType,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusObj[row.customerType]}
        pill
      >
        {row.customerType}
      </Badge>
    )
  },
  {
    name: "Address",
    minWidth: "230px",
    sortable: true,
    sortField: "address",
    selector: (row) => row.address,
    cell: (row) => <span className="text-capitalize">{row.address}</span>
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => <Actions row={row} />
  }
];
