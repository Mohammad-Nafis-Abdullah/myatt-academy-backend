import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

// baseQuery
const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_URL + "/api",
  baseUrl: "https://admin.myattacademy.com/api",
  // credentials: "include",
  prepareHeaders: (headers, { getState }: any) => {
    let token = getState().auth.token;
    let _token = localStorage.getItem("_token");
    if (!token) token = _token ? JSON.parse(_token) : null;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("customBearerToken", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    // headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "*");
    headers.set("Accept", "application/json");
    headers.set(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,content-type,Authorization, Accept"
    );
    headers.set("Access-Control-Allow-Credentials", "true");

    return headers;
  },
});

// baseQueryWithAuth
const baseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(logout());
    // const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    // // store the new token
    // if (refreshResult.data) {
    //   const { token } = refreshResult.data.data;
    //   const auth  = api?.getState()?.auth as any;
    //   api.dispatch(setCredentials({ ...auth, token }));
    // }
    // // retry the original request
    // result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

// createApi
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
  tagTypes: ["ASSIGNMENTS", "QUIZ_RESULT"],
});
