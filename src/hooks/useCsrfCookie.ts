import getCookie from "../utils/getCookie"
import { useQuery } from "@tanstack/react-query"

const apiUrl = import.meta.env.VITE_API_URL

export default function useCsrfCookie() {
  return useQuery({
    queryKey: ["csrf"],
    queryFn: async () => {
      await fetch(`${apiUrl}/sanctum/csrf-cookie`, {
        headers: { Accept: "application/json" },
        credentials: "include",
      })

      const cookie = getCookie("XSRF-TOKEN")

      return cookie ? decodeURIComponent(cookie) : ""
    },
  })
}
