import { FormEventHandler } from "react"
import { Input } from "../components"
import { useRegister } from "../hooks/requests"
import ErrorList from "../components/errorList"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"

export default function RegisterPage() {
  const navigate = useNavigate()
  const register = useRegister()

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    register
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
      <Input name="name" label="Name" type="text" />
      <Input name="email" label="Email" type="email" />
      <div className="flex justify-between gap-6">
        <Input
          fieldClassName="flex-1"
          name="password"
          label="Password"
          type="password"
        />
        <Input
          fieldClassName="flex-1"
          name="password_confirmation"
          label="Password confirmation"
          type="password"
        />
      </div>

      <Button type="submit" loading={register.isPending}>
        Register
      </Button>

      {register.isError && <ErrorList errors={register.error} />}
    </form>
  )
}
