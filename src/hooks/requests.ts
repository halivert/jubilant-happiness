import { useMutation, useQueryClient } from "@tanstack/react-query"
import useCsrfCookie, { queryKey as csrfQueryKey } from "./useCsrfCookie"
import { normalizeErrors } from "../utils/errors"
import { $fetch } from "../utils/requests"
import { queryKey as userQueryKey } from "../queries/user"

const responseErrors = async (response: Response): Promise<Response> => {
  const errorBody = await response.json().catch((errors) => errors)

  return Response.json(normalizeErrors(errorBody), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  const csrfCookie = useCsrfCookie()

  return useMutation<Response, Response, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await $fetch("/login", {
        method: "POST",
        headers: new Headers({
          "X-XSRF-TOKEN": csrfCookie.data ?? "",
        }),
        body,
      })

      if (response.ok) {
        return response
      }

      return Promise.reject(await responseErrors(response))
    },
    onError: (error) => {
      if (error.status === 419) {
        queryClient.invalidateQueries({ queryKey: csrfQueryKey })
      }
    },
    onSuccess: (response) => {
      response.json().then((userData) => {
        queryClient.setQueryData(userQueryKey, userData)
        queryClient.invalidateQueries({ queryKey: csrfQueryKey })
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
        headers: new Headers({
          "X-XSRF-TOKEN": csrfCookie.data ?? "",
        }),
        body,
      })

      if (response.ok) {
        return response
      }

      return Promise.reject(await responseErrors(response))
    },
    onError: (error) => {
      if (error.status === 419) {
        queryClient.invalidateQueries({ queryKey: csrfQueryKey })
      }
    },
    onSuccess: (response) => {
      response.json().then((userData) => {
        queryClient.setQueryData(userQueryKey, userData)
      })
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
        headers: new Headers({
          "X-XSRF-TOKEN": csrfCookie.data ?? "",
        }),
      })

      if (response.ok) {
        return response
      }

      return Promise.reject(await responseErrors(response))
    },
    onError: (error) => {
      if (error.status === 419) {
        queryClient.invalidateQueries({ queryKey: csrfQueryKey })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey })
    },
    retry: 2,
  })
}
