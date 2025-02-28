import { useGetUsersQuery } from "@/redux/api/userApi";

function useUsers() {
  const { data, isLoading } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return {
    data,
    isLoading,
  };
}

export default useUsers;
