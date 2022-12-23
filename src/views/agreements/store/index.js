// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

export const getAgreement = createAsyncThunk(
  "agreements/getAgreement",
  async (id) => {
    const response = await axios.get("/api/agreements/agreement/", { id });
    return response.data.user;
  }
);

export const createSellerAgreement = createAsyncThunk(
  "agreements/createSellerAgreement",
  async (data) => {
    try {
      const response = await axios.post(
        "/api/agreements/create/seller-agreement",
        {
          data
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

export const signingAgreement = createAsyncThunk(
  "agreements/signingAgreement",
  async (data) => {
    try {
      const response = await axios.post("/api/agreements/signing-agreement", {
        data
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

export const searchAgreement = createAsyncThunk(
  "agreements/searchAgreement",
  async (data) => {
    try {
      const response = await axios.post("/api/agreements/search-agreement", {
        data
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);



export const agreementsSlice = createSlice({
  name: "agreements",
  initialState: {
    data: [],
    total: 1,
    isLoading: false,
    params: {},
    allData: [],
    selectedUser: null,
    agreement: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSellerAgreement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSellerAgreement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createSellerAgreement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAgreement.fulfilled, (state, action) => {
        state.agreement = action.payload;
      });
  }
});

export default agreementsSlice.reducer;
