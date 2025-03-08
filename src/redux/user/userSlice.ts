import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { deleteUser, getUsers, User } from "../../data/data";
import { RootState } from "../store";

// get
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => getUsers(),
);

// delete
export const removeUser = createAsyncThunk<number, number>(
  "users/removeUser",
  async (id: number) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      throw new Error("Failed to delete a user!");
    }
  },
);

export interface UserState {
  userList: User[];
  visibleUsers: number;
  loading: boolean;
  expandedRowId: number | null;
}

export interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

const initialState = {
  userList: [],
  visibleUsers: 10,
  loading: false,
  expandedRowId: null,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showMoreUsers(state) {
      state.visibleUsers += 10;
    },
    showLessUsers(state) {
      state.visibleUsers -= 10;
    },
    setExpandedRow(state, action: PayloadAction<number | null>) {
      state.expandedRowId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.userList.push(...payload);
        state.loading = false;
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        state.userList = state.userList.filter((user) => user.id !== payload);
        state.loading = false;
      });
  },
});

// actions
export const { showMoreUsers, showLessUsers, setExpandedRow } =
  userSlice.actions;

// selectors
export const selectUsers = (state: RootState) => state.user.userList;
export const selectVisibleUsers = (state: RootState) =>
  state.user.userList.slice(0, state.user.visibleUsers);
export const selectLoading = (state: RootState) => state.user.loading;
export const selectExpandedRowId = (state: RootState) =>
  state.user.expandedRowId;

export default userSlice.reducer;
