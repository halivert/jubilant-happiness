import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  horizontal?: boolean
  fieldClassName?: string
}

export function Input({
  name,
  label,
  className,
  fieldClassName,
  horizontal = false,
  ...rest
}: InputProps) {
  return (
    <label
      className={[
        "flex gap-2",
        horizontal ? "flex-row" : "flex-col",
        fieldClassName,
      ].join(" ")}
    >
      {label}
      <input
        className={`border-purple-400 rounded border px-2 py-1 ${className}`}
        {...rest}
        name={name}
      />
    </label>
  )
}
