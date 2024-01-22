import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UserRole {
  role: "student" | "admin" | "moderator";
  name: string;
  email: string;
  id: string;
}

const initialState: UserRole = {
  role: "student",
  name: "",
  email: "",
  id: "",
};

export const userRoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
      state.email = action.payload;
      state.name = action.payload;
      state.id = action.payload;
    },

  },
});

export const { setUserRole } = userRoleSlice.actions;

// export const selectRole  =(state:RootState) =>state.

export default userRoleSlice.reducer;
