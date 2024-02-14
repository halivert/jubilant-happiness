import { useMutation, useQueryClient } from "@tanstack/react-query"
import useCsrfCookie from "./useCsrfCookie"
import { normalizeErrors } from "../utils/errors"

const apiUrl = import.meta.env.VITE_API_URL

export function useLogin() {
  const queryClient = useQueryClient()

  const csrfCookie = useCsrfCookie()

  return useMutation<boolean, Response, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "X-XSRF-TOKEN": csrfCookie.data ?? "",
        }),
        credentials: "include",
        body,
      }).catch((error) =>
        Response.json(error.message, {
          status: 400,
          statusText: "Request error",
        }),
      )

      if (response.ok) {
        return true
      }

      const errorBody = await response.json().catch((errors) => errors)

      return Promise.reject(
        Response.json(normalizeErrors(errorBody), {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        }),
      )
    },
    onError: (error) => {
      if (error.status === 419) {
        queryClient.invalidateQueries({ queryKey: ["csrf"] })
      }
    },
  })
}
