import { apiSlice } from "@/redux/api/apiSlice";

const UserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userUpdate: builder.mutation({
      query: (data) => ({
        url: "/profile-update",
        method: "POST",
        body: data,
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        formData: true,
      }),
    }),
  }),
});

export const { useUserUpdateMutation } = UserApi;
