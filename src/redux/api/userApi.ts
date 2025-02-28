import { UserProfile } from "@/shared/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "users",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<{ users: UserProfile[] }, void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUser: builder.query<UserProfile, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation<UserProfile, UserProfile>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<
      UserProfile,
      { id: string; data: Omit<UserProfile, "id"> }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users", "User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
