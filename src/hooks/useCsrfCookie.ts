import { deleteCookie, getCookie } from "../utils/cookies"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { $fetch } from "../utils/requests"

export const queryKey = ["csrf"] as const

const cookieName = "XSRF-TOKEN"

export function invalidateCsrfCookie(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey })
  deleteCookie(cookieName)
}

export default function useCsrfCookie() {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const cookie = getCookie(cookieName)

      if (cookie) {
        return decodeURIComponent(cookie)
      }

      await $fetch("/sanctum/csrf-cookie")

      const newCookie = getCookie(cookieName)

      return newCookie ? decodeURIComponent(newCookie) : null
    },
    staleTime: Infinity,
  })
}
