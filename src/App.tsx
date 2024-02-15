import {
  Link,
  NavLink,
  LoaderFunction,
  Outlet,
  RouteObject,
  redirect,
  NavLinkProps,
  useNavigate,
} from "react-router-dom"
import { useUser, query as userQuery } from "./queries/user"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import HomePage from "./pages/homePage"

import "./App.css"
import { QueryClient } from "@tanstack/react-query"
import { useLogout } from "./hooks/requests"

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const user =
      queryClient.getQueryData(userQuery.queryKey) ??
      (await queryClient.fetchQuery(userQuery))

    if (
      ["/login", "/register"].some((endpoint) => request.url.includes(endpoint))
    ) {
      if (user) {
        return redirect("/")
      }

      return null
    }

    if (!user) {
      return redirect("/login")
    }

    return null
  }

export const routes: Array<RouteObject> = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    element: <HomePage />,
    index: true,
  },
]

function App() {
  const navigate = useNavigate()
  const user = useUser()
  const logout = useLogout()

  const handleLogout = () => {
    logout
      .mutateAsync()
      .then((response) => {
        if (response.ok) {
          navigate("/login")
        }
      })
      .catch((error) => error)
  }

  const navLinkClassName: NavLinkProps["className"] = ({ isActive }) => {
    if (!isActive) return ""

    return ["underline"].join(" ")
  }

  return (
    <section className="h-full w-full text-left">
      <nav className="flex mb-6 justify-between items-center">
        <div>
          <Link to="/" className="font-bold text-lg">
            Home
          </Link>
        </div>
        <div className="flex gap-3">
          {user.data ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className={navLinkClassName} to="login">
                Login
              </NavLink>
              <NavLink className={navLinkClassName} to="register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </section>
  )
}

export default App
