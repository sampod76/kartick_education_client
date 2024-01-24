import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UserRole {
  data: {
    role: string;
    name: string;
    email: string;
    img?: string;
    _id: string;
  };
  isLoading?: boolean;
  isError?: boolean;
}

const initialState: UserRole = {
  data: { role: "", name: "", email: "", _id: "" },
  isLoading: true,
  isError: false,
};

export const userRoleSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserRole: (
      { data, isLoading, isError },
      { payload }: { payload: UserRole }
    ) => {
      data.role = payload.data.role;
      data.email = payload.data.email;
      data.name = payload.data.name;
      data._id = payload.data._id;
      isLoading = payload.isLoading;
      isError = payload.isError;
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;

// export const selectRole  =(state:RootState) =>state.

export default userRoleSlice.reducer;
