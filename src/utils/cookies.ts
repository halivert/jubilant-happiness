export function getCookie(name: string): string | undefined {
  return document.cookie
    .split(";")
    .map((row) => row.trim())
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=${new Date(0)}; domain=${import.meta.env.VITE_API_DOMAIN}`
}
