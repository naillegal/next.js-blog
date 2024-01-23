import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthorInfo } from "types";
import * as authApi from "../../api/authApi";
import iaxios from "@/api/iaxios";

const initialAuthInfo: IAuthorInfo = {
  id: 0,
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  token: "",
};

interface IAuthState {
  authInfo: IAuthorInfo;
  loginStatus: "notchecked" | "loggedIn" | "loggedOut";
}

const initialState: IAuthState = {
  authInfo: initialAuthInfo,
  loginStatus: "notchecked",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuthorInfo>) => {
      state.authInfo = action.payload;
      state.loginStatus = "loggedIn";
    },
    clearAuth: (state) => {
      state.authInfo = initialAuthInfo;
      state.loginStatus = "loggedOut";
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

type LoginParams = {
  username: string;
  password: string;
};

export const loginAction = createAsyncThunk<void, LoginParams>(
  "auth/login/",
  async ({ username, password }, { dispatch }) => {
    try {
      const response = await authApi.login(username, password);
      dispatch(setAuth(response.data));
      localStorage.setItem("authInfo", JSON.stringify(response.data));
      iaxios.defaults.headers["Authorization"] = `Token ${response.data.token}`;
    } catch (error) {
      console.error("Login Error:", error);
    }
  }
);

type RegisterParams = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
};

export const registerAction = createAsyncThunk<void, RegisterParams>(
  "auth/register/",
  async (
    { username, password, email, first_name, last_name },
    { dispatch }
  ) => {
    authApi
      .register(username, password, email, first_name, last_name)
      .then((response) => {
        dispatch(setAuth(response.data));
        localStorage.setItem("authInfo", JSON.stringify(response.data));
        iaxios.defaults.headers[
          "Authorization"
        ] = `Token ${response.data.token}`;
      });
  }
);

export const logoutAction = createAsyncThunk<void, undefined>(
  "auth/logout/",
  async (_, { dispatch }) => {
    authApi.logout().then(() => {
      dispatch(clearAuth());
      localStorage.removeItem("authInfo");
      iaxios.defaults.headers["Authorization"] = "";
    });
  }
);

export const checkLoginAction = createAsyncThunk<void, undefined>(
  "auth/checkLogin/",
  async (_, { dispatch }) => {
    const authInfo = localStorage.getItem("authInfo");
    if (authInfo) {
      dispatch(setAuth(JSON.parse(authInfo)));
      iaxios.defaults.headers["Authorization"] = `Token ${
        JSON.parse(authInfo).token
      }`;
    } else {
      dispatch(clearAuth());
    }
  }
);
