export function useAemetFetch(endpoint: string, options: any = {}) {
  const config = useRuntimeConfig()

  const url = `${config.API_URL}${endpoint}?api_key=${config.API_KEY}`
  const params = {
    ...options,
    headers: {
      Authorization: `Bearer ${config.API_KEY}`,
      ...options.headers
    }
  }

  return $fetch(url, params)
}
