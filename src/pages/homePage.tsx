import { useUser } from "../queries/user"

export default function HomePage() {
  const user = useUser()

  return (
    <section>
      <h1 className="font-bold text-3xl">Welcome home</h1>
      <h2 className="text-xl">{user.data?.name}</h2>
    </section>
  )
}
