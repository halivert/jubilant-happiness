const apiUrl = import.meta.env.VITE_API_URL

export async function $fetch(
  endpoint: string,
  options?: Omit<RequestInit, "headers"> & {
    headers: Headers
  },
): Promise<Response> {
  const headers = new Headers({
    Accept: "application/json",
  })

  options?.headers.forEach((value, key) => {
    headers.append(key, value)
  })

  const url = endpoint.startsWith("/")
    ? apiUrl + endpoint
    : `${apiUrl}/${endpoint}`

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  }).catch((error) =>
    Response.json(error.message, {
      status: 400,
      statusText: "Request error",
    }),
  )
}
