import React, { useState } from "react";

// ** Store & Actions
import { getCustomer, deleteCustomer } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Icons Imports
import { MoreVertical, Trash2, Archive } from "react-feather";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Actions = ({ row }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.customers);

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="column-action">
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              dispatch(getCustomer(row.id));
              toggleSidebar();
            }}
          >
            <Archive size={14} className="me-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteCustomer(row.id));
            }}
          >
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        title="Update Customer"
      />
    </div>
  );
};

export default Actions;
