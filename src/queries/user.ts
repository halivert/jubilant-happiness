import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { $fetch } from "../utils/requests"

export const queryKey = ["user"] as const

interface User {
  id: number
  name: string
  email: string
}

export const query: UndefinedInitialDataOptions<User> = {
  queryKey,
  queryFn: async () => {
    return $fetch("/me")
      .then((response) => {
        if (response.ok) return response.json()
        return null
      })
      .catch(() => null)
  },
  retry: false,
  staleTime: Infinity,
}

export function useUser() {
  return useQuery(query)
}
