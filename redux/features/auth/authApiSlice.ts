import { apiSlice } from "@/redux/api/apiSlice";
import { setCredentials, setAuthStatus } from "@/redux/features/auth/authSlice";

const AuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        headers: {
          credentials: "include",
          // change accept to application/json
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setAuthStatus("loading"));
          const result = await queryFulfilled;
          // console.log({ result });

          if (result?.data?.status === 200) {
            // update the auth slice with the new credentials
            dispatch(
              setCredentials({
                user: result.data.data,
                token: result.data.token,
              })
            );

            dispatch(setAuthStatus("fulfilled"));

            // store the credentials in localStorage
            localStorage.setItem("_token", JSON.stringify(result.data.token));
          } else if (result?.data?.status === 500) {
            dispatch(
              setCredentials({
                user: result.data.data,
                token: result.data.token,
              })
            );
            dispatch(setAuthStatus("rejected"));
            localStorage.removeItem("_token");
          }
        } catch (error) {
          // console.log({ error });
          localStorage.removeItem("_token");
        }
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     *  this is a endpoint that will be used to logout the user
     *  then it will clear the auth slice and the localStorage
     */

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // clear the auth slice
          dispatch(
            setCredentials({
              user: null,
              token: null,
            })
          );

          // clear the localStorage
          localStorage.removeItem("_token");
        } catch (error) {
          localStorage.removeItem("_token");
        }
      },
    }),

    /**
     * this is a custom endpoint that will be used to refresh the token
     * when the user is logged in and the token is expired
     */

    me: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setAuthStatus("loading"));

          const result = await queryFulfilled;
          // update the auth slice with the new credentials
          dispatch(
            setCredentials({
              user: result.data.data,
              token: result.data.token,
            })
          );

          dispatch(setAuthStatus("fulfilled"));

          // store the credentials in localStorage
          localStorage.setItem("_token", JSON.stringify(result.data.token));
        } catch (error) {
          dispatch(setAuthStatus("rejected"));
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyMeQuery,
} = AuthApi;
export const { reducerPath } = AuthApi;
