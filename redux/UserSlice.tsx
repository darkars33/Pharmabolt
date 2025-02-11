import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserData, saveUserData, removeUserData } from "./secureStore";


export const loadUserData = createAsyncThunk("auth/loadUserData", async () => {
  return await getUserData();
});

export interface UserState {
  userID: string;
  flashKey: string;
  user:any;
}

const initialState: UserState = {
  userID: "",
  flashKey: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ userID: string; flashKey: string }>) => {
      state.userID = action.payload.userID;
      state.flashKey = action.payload.flashKey;
      saveUserData(action.payload.userID, action.payload.flashKey);
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.userID = "";
      state.flashKey = "";
      removeUserData(); 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserData.fulfilled, (state, action) => {
      state.userID = action.payload.userID || "";
      state.flashKey = action.payload.flashKey || "";
    });
  },
});

export const { setUserData, setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
