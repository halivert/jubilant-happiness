import { RefObject, useEffect } from "react"

export default function useTelegramLoginWidget<T extends HTMLElement>(
  ref: RefObject<T | null>,
) {
  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://telegram.org/js/telegram-widget.js?22"
    script.dataset.telegramLogin = "jalibot"
    script.dataset.size = "medium"
    script.dataset.onauth = "onTelegramAuth(user)"
    script.dataset.requestAccess = "write"

    ref.current?.appendChild(script)

    return () => {
      ref.current?.removeChild(script)
    }
  }, [])
}
