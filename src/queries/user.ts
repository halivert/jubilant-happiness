import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { $fetch } from "../utils/requests"
import { getCookie } from "../utils/cookies"

export const queryKey = ["user"] as const

interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  two_factor_secret?: string
  two_factor_recovery_codes?: string
  two_factor_confirmed_at?: string
  created_at: string
  updated_at: string
  telegram_id?: number
}

export const query: UndefinedInitialDataOptions<{ data: User }, Error, User> = {
  queryKey,
  queryFn: async () => {
    return $fetch("/me", {
      token: encodeURIComponent(getCookie("XSRF-TOKEN") ?? ""),
    })
      .then((response) => {
        if (response.ok) return response.json()
        return null
      })
      .catch(() => null)
  },
  select: (response) => {
    return response.data
  },
  retry: false,
  staleTime: Infinity,
}

export function useUser() {
  return useQuery(query)
}
