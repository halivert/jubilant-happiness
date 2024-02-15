import { getCookie } from "../utils/cookies"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { $fetch } from "../utils/requests"

export const queryKey = ["csrf"] as const

const cookieName = "XSRF-TOKEN"

export function invalidateCsrfCookie(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey })
}

export default function useCsrfCookie() {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await $fetch("/sanctum/csrf-cookie")

      if (response.ok) {
        const newCookie = getCookie(cookieName)

        if (newCookie) {
          return decodeURIComponent(newCookie)
        }
      }

      return null
    },
    staleTime: Infinity,
  })
}
