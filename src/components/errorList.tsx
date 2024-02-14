import { useEffect, useState } from "react"

interface ErrorListProps {
  errors: Response
}

export default function ErrorList({ errors }: ErrorListProps) {
  const [internalErrors, setInternalErrors] = useState<Array<string>>([])

  useEffect(() => {
    if (errors.bodyUsed) {
      return
    }

    errors.json().then((errorList) => {
      setInternalErrors(
        errorList.map((error: { message: string }) => error.message),
      )
    })
  }, [errors])

  return (
    <div className="rounded bg-purple-200 p-3">
      <ul role="list" className="list-disc list-inside">
        {internalErrors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
