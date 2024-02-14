import { Link, Outlet } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <section className="h-full w-full text-left">
      <nav className="flex mb-6 justify-between">
        <div>Minimal</div>
        <div className="flex gap-3">
          <Link to="login">Login</Link>
          <Link to="register">Register</Link>
        </div>
      </nav>

      <Outlet />
    </section>
  )
}

export default App
