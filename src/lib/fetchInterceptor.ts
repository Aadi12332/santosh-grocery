export const SIGNIN_REDIRECT = "/role-wise-sign-in?role=customer"

const getAuthHeaderFromInit = (init: RequestInit | undefined) => {
  const headers = init?.headers
  if (!headers) return undefined

  if (headers instanceof Headers) {
    return headers.get("Authorization") || undefined
  }

  if (Array.isArray(headers)) {
    const pair = headers.find(([name]) => name.toLowerCase() === "authorization")
    return pair ? pair[1] : undefined
  }

  return (headers as Record<string, string>)["Authorization"] || (headers as Record<string, string>)["authorization"]
}

const clearAuthStorage = () => {
  const savedRole = localStorage.getItem("role")
  localStorage.removeItem("authToken")
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("user")
  localStorage.removeItem("activeTab")
  if (savedRole === "customer") {
    localStorage.setItem("role", "customer")
  } else {
    localStorage.removeItem("role")
  }
}

const shouldRedirectOnResponse = async (response: Response, init: RequestInit | undefined) => {
  const authToken = localStorage.getItem("authToken")
  const authHeader = getAuthHeaderFromInit(init)

  if (!authToken && !authHeader) {
    return false
  }

  if (response.status === 401 || response.status === 403) {
    return true
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    try {
      const payload = await response.clone().json()
      const message = String(payload?.message || payload?.error || "").toLowerCase()
      if (
        (message.includes("token") && message.includes("expire")) ||
        message.includes("authentication token not found") ||
        (message.includes("token") && message.includes("not found"))
      ) {
        return true
      }
    } catch {
      // ignore parse failures
    }
  }

  return false
}

const redirectToCustomerSignIn = () => {
  clearAuthStorage()
  if (typeof window !== "undefined") {
    window.location.href = SIGNIN_REDIRECT
  }
}

export const patchFetchForTokenExpiry = () => {
  if (typeof window === "undefined" || !window.fetch) {
    return
  }

  const originalFetch = window.fetch.bind(window) as typeof window.fetch

  window.fetch = async (...args: Parameters<typeof window.fetch>) => {
    const response = await originalFetch(...args)
    if (await shouldRedirectOnResponse(response, args[1])) {
      redirectToCustomerSignIn()
    }
    return response
  }
}
