export function useAdsenseScript() {
  onMounted(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `(adsbygoogle = window.adsbygoogle || []).push({});`
    document.body.appendChild(script)
  })
}
