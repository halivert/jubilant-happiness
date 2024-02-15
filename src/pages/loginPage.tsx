import { FormEventHandler } from "react"
import { Input } from "../components"
import { useLogin } from "../hooks/requests"
import ErrorList from "../components/errorList"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin()

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    login
      .mutateAsync(new FormData(event.target as HTMLFormElement))
      .then((response) => {
        if (response.ok) {
          navigate("/")
        }
      })
      .catch((error) => error)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input name="email" label="Email" type="email" />
      <Input name="password" label="Password" type="password" />

      <Button type="submit" loading={login.isPending}>
        Login
      </Button>

      {login.isError && <ErrorList errors={login.error} />}
    </form>
  )
}
