export function useApiFetch(endpoint: string, options: any = {}) {
  const config = useRuntimeConfig()

  const url = `${config.API_URL}${endpoint}?api_key=${config.API_KEY}`
  console.log('url', url)
  const params = {
    ...options,
    headers: {
      Authorization: `Bearer ${config.API_KEY}`,
      ...options.headers
    }
  }

  return $fetch(url, params)
}
