function hasMessageProp(errors: unknown): errors is { message: unknown } {
  return (
    !!errors && typeof errors === "object" && errors.hasOwnProperty("message")
  )
}

function hasErrorsProp(errors: unknown): errors is { errors: unknown } {
  return (
    !!errors && typeof errors === "object" && errors.hasOwnProperty("errors")
  )
}

function isApiError(errors: unknown): errors is Record<string, Array<string>> {
  if (!errors || typeof errors !== "object") {
    return false
  }

  return Object.values(errors).every((errorList) => {
    if (!Array.isArray(errorList)) {
      return false
    }

    return errorList.every((error) => typeof error === "string")
  })
}

export function normalizeErrors(
  errors: Array<unknown> | unknown,
): Array<{ message: string }> {
  if (isApiError(errors)) {
    return Object.values(errors).flatMap((errorList) =>
      normalizeErrors(errorList),
    )
  }

  if (Array.isArray(errors)) {
    return errors.flatMap((error) => normalizeErrors(error))
  }

  if (hasErrorsProp(errors)) {
    return normalizeErrors(errors.errors)
  }

  if (hasMessageProp(errors)) {
    return normalizeErrors(errors.message)
  }

  if (typeof errors === "string") {
    return [{ message: errors }]
  }

  return []
}
