import { apiSlice } from "@/redux/api/apiSlice";

const CourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    courses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    // get single course
    course: builder.query({
      query: (query) => ({
        url: `/courses${query}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    // get relative courses
    relativeCourses: builder.query({
      query: (query) => `/releted_subjects?${query}`,
    }),

    // get lecture details
    lecture: builder.query({
      query: (query) => ({
        url: `course/lesson/video_player${query}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    grades: builder.query({
      query: () => ({
        url: "/grades",
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
    order: builder.mutation({
      query: (credentials) => ({
        url: "/checkout",
        method: "POST",
        body: credentials,
        headers: {
          // credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    //course dettails apis
    assignment: builder.query({
      query: (lessonId) => ({
        url: `/course/assignment?lesson_id=${lessonId}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["ASSIGNMENTS"],
    }),

    // store assignment
    storeAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignment/submission`,
        method: "POST",
        body: data,
        formData: true,
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ASSIGNMENTS"],
    }),

    story: builder.query({
      query: (lessonId) => ({
        url: `/course/story?lesson_id=${lessonId}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    storeStory: builder.mutation({
      query: (data) => ({
        url: `/story/submission`,
        method: "POST",
        body: data,
        formData: true,
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    vocabulary: builder.query({
      query: (lessonId) => ({
        url: `/course/vocabulary?lesson_id=${lessonId}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    storeVocabulary: builder.mutation({
      query: (data) => ({
        url: `/vocabulary/submission`,
        method: "POST",
        body: data,
        formData: true,
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    quiz: builder.query({
      query: (id) => ({
        url: `/course/quiz?lesson_id=${id}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    quizResult: builder.query({
      query: (id) => ({
        url: `https://admin.myattacademy.com/api/course/quiz/answer/${id}`,
        method: "GET",
        headers: {
          credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["QUIZ_RESULT"],
    }),

    quizSubmit: builder.mutation({
      query: (data) => ({
        url: "/course/quiz/submit",
        method: "POST",
        body: data,
        headers: {
          // credentials: "include",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["QUIZ_RESULT"],
    }),
  }),
});

export const {
  useCoursesQuery,
  useCourseQuery,
  useRelativeCoursesQuery,
  useGradesQuery,
  useLectureQuery,
  useOrderMutation,
  useAssignmentQuery,
  useStoryQuery,
  useStoreStoryMutation,
  useVocabularyQuery,
  useStoreVocabularyMutation,
  useQuizQuery,
  useQuizResultQuery,
  useQuizSubmitMutation,
  useStoreAssignmentMutation,
} = CourseApi;
export const { reducerPath } = CourseApi;
