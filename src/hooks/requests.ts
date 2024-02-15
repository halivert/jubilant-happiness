import { useMutation, useQueryClient } from "@tanstack/react-query"
import useCsrfCookie, { invalidateCsrfCookie } from "./useCsrfCookie"
import { $fetch } from "../utils/requests"
import { queryKey as userQueryKey } from "../queries/user"
import { responseErrors } from "../utils/errors"

export function useLogin() {
  const queryClient = useQueryClient()

  const csrfCookie = useCsrfCookie()

  return useMutation<Response, Response, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await $fetch("/login", {
        method: "POST",
        token: csrfCookie.data,
        body,
      })

      if (response.ok) {
        return response
      }

      return Promise.reject(await responseErrors(response))
    },
    onError: (error) => {
      if (error.status === 419) {
        invalidateCsrfCookie(queryClient)
      }
    },
    onSuccess: (response) => {
      response.json().then((data) => {
        if (data.two_factor) {
          throw new Error("User requires two factor auth. Not implemented yet.")
        }

        queryClient.invalidateQueries({ queryKey: userQueryKey })
        invalidateCsrfCookie(queryClient)
      })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  const csrfCookie = useCsrfCookie()

  return useMutation<Response, Response, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await $fetch("/register", {
        method: "POST",
        token: csrfCookie.data,
        body,
      })

      if (response.ok) {
        return response
      }

      return Promise.reject(await responseErrors(response))
    },
    onError: (error) => {
      if (error.status === 419) {
        invalidateCsrfCookie(queryClient)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey })
      invalidateCsrfCookie(queryClient)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  const csrfCookie = useCsrfCookie()

  return useMutation<Response, Response>({
    mutationFn: async () => {
      const response = await $fetch("/logout", {
        method: "POST",
        token: csrfCookie.data,
      })

      if (response.ok) {
        return response
      }

      return Promise.reject(await responseErrors(response))
    },
    onError: (error) => {
      if (error.status === 419) {
        invalidateCsrfCookie(queryClient)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey })
      invalidateCsrfCookie(queryClient)
    },
    retry: 2,
  })
}
