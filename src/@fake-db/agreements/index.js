import mock from "../mock";

const data = {
  agreements: [
    {
      id: 1,
      seller: {
        name: "luqman",
        email: "luqmankhan@gmail.com",
        address: "i-8 islamabad pakistan",
        phone: "0300-3049400",
        birthDay: "12-3-1999"
      },
      purchaser: {
        name: "luqman",
        email: "luqmankhan@gmail.com",
        address: "i-8 islamabad pakistan",
        phone: "0300-3049400",
        birthDay: "12-3-1999"
      },
      vechile: {
        name: "white color toyota",
        utilty: "white color",
        plate: "#p234",
        vin: "on road cost include"
      },
      purchase: {
        price: "cash on sattlement",
        amount: "3000",
        date: "20-3-2020",
        gst: "include if any"
      }
    }
  ]
};

// ------------------------------------------------
// POST: Return Agreement 
// ------------------------------------------------

mock.onGet("/api/agreements/agreement").reply((config) => {
    const { id } = config;
    const agreement = data.agreements.find((i) => i.id === id);
    return [200, { agreement }];
  });