import { InputHTMLAttributes } from "react"

export const Input: React.FC<
  {
    label: string
    horizontal?: boolean
  } & InputHTMLAttributes<HTMLInputElement>
> = ({ name, label, horizontal = false, ...rest }) => {
  return (
    <label
      className={["flex gap-2", horizontal ? "flex-row" : "flex-col"].join(" ")}
    >
      {label}
      <input
        className="border-purple-400 rounded border px-2 py-1"
        {...rest}
        name={name}
      />
    </label>
  )
}
