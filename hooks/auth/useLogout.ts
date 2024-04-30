import { logoutUser } from "@/db/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const logoutQuery = useQuery({
    queryKey: ["logout"],
    queryFn: logoutUser,
    enabled: false,
  });

  const queryClient = useQueryClient();

  // invalidate session key when status of the query is done
  if (logoutQuery.isSuccess) queryClient.invalidateQueries({ queryKey: ["user"] });

  return { logout: logoutQuery.refetch, isLoggingOut: logoutQuery.isFetching };
}
