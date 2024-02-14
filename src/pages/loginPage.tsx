import { FormEventHandler } from "react"
import { Input } from "../components"
import { useLogin } from "../hooks/requests"
import ErrorList from "../components/errorList"

export default function LoginPage() {
  const login = useLogin()

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    login
      .mutateAsync(new FormData(event.target as HTMLFormElement))
      .then((response) => console.log({ response }))
      .catch((error) => error)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input name="email" label="Email" type="email" />
      <Input name="password" label="Password" type="password" />

      <button className="bg-purple-900 text-purple-50" type="submit">
        Login
      </button>

      {login.isError && <ErrorList errors={login.error} />}
    </form>
  )
}
