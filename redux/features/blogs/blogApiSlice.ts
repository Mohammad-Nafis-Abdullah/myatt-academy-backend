import { apiSlice } from "@/redux/api/apiSlice";

const BlogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    blogs: builder.query({
      query: (queryParams: string) => ({
        url: `/blogs${queryParams}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
    blog: builder.query({
      query: (slug: string) => ({
        url: `/blog/${slug}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useBlogsQuery, useBlogQuery } = BlogApiSlice;
export const { reducerPath } = BlogApiSlice;
