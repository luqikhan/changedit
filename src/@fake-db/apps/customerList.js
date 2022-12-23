import mock from "../mock";

// ** Utils
import { paginateArray } from "../utils";

const data = {
  customers: [
    {
      id: 1,
      fullName: "Galen Slixby",
      mobile: "0300382983",
      address: "main 124 st",
      customerType: "Regular",
      email: "abc12@gmail.com"
    },
    {
      id: 2,
      fullName: "Manual - Aran Khan",
      mobile: "0300382983",
      address: "main 124 st",
      customerType: "Regular",
      email: "abc432@gmail.com"
    }
  ]
};

// GET ALL DATA
mock.onGet("/api/customers/list/all-data").reply(200, data.customers);

// POST: Add new customer
mock.onPost("/apps/customers/add-customer").reply((config) => {
  // Get event from post data
  const customer = JSON.parse(config.data);
  const highestValue = data.customers.reduce((a, b) =>
    a.id > b.id ? a : b
  ).id;

  customer.id = highestValue + 1;

  data.customers.push(customer);

  return [201, { customer }];
});

// GET Updated DATA
mock.onGet("/api/customers/list/data").reply((config) => {
  const {
    q = "",
    page = 1,
    perPage = 10,
    sort = "asc",
    sortColumn = "fullName"
  } = config;

  /* eslint-disable  */
  const queryLowered = q.toLowerCase();

  const dataAsc = data.customers.sort((a, b) =>
    a[sortColumn] < b[sortColumn] ? -1 : 1
  );

  const dataToFilter = sort === "asc" ? dataAsc : dataAsc.reverse();

  const filteredData = dataToFilter.filter(
    (customer) =>
      customer.email.toLowerCase().includes(queryLowered) ||
      customer.fullName.toLowerCase().includes(queryLowered) 
  );
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      customers: paginateArray(filteredData, perPage, page)
    }
  ];
});

// GET Customer
mock.onGet("/api/customers/customer").reply((config) => {
  const { id } = config;
  const customer = data.customers.find((i) => i.id === id);
  return [200, { customer }];
});

// DELETE: Deletes Customer
mock.onDelete("/apps/customers/delete").reply((config) => {
  // Get customer id from URL
  let customerId = config.id;

  // Convert Id to number
  customerId = Number(customerId);

  const customerIndex = data.customers.findIndex((t) => t.id === customerId);
  data.customers.splice(customerIndex, 1);

  return [200];
});
