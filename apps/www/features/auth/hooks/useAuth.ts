import { useQuery } from "@tanstack/react-query";

import { getAuthUser } from "~/features/auth/api/getAuthUser";

export function useAuth() {
  const profileQuery = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
  });

  return { isLoading: profileQuery.isPending, user: profileQuery.data };
}
