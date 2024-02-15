export function getCookie(name: string): string | undefined {
  return document.cookie
    .split(";")
    .map((row) => row.trim())
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
}

export function deleteCookie(name: string): void {
  console.info(`Deleting ${name}`)
  document.cookie = `${name}=; expires=${new Date(0)}`
}
