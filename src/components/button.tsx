import { ButtonHTMLAttributes } from "react"

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  loading?: boolean
}

export function Button({ children, className, loading, ...rest }: ButtonProps) {
  const loadingIcon = (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )

  return (
    <button
      className={[
				"rounded-lg py-2 px-4 text-base cursor-default font-medium",
        "flex justify-center bg-purple-900 text-purple-50",
        className,
				"hover:bg-purple-800 active:bg-purple-700",
				"disabled:cursor-not-allowed disabled:opacity-80"
      ].join(" ")}
      disabled={loading}
      {...rest}
    >
      {loading && loadingIcon}
      {children}
    </button>
  )
}
