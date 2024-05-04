import { apiSlice } from "@/redux/api/apiSlice";
import { method } from "lodash";

const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all teachers
    teachers: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    // get all staffs
    staffs: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useTeachersQuery, useStaffsQuery, reducerPath } =
  employeesApiSlice;
