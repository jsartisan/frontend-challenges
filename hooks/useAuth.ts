import { getAuthUser } from "@/db/auth";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const profileQuery = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
  });

  return { isLoading: profileQuery.isPending, user: profileQuery.data?.data?.[0] };
}
