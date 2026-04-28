export function formatProjectUrl(url: string) {
  try {
    const { hostname, pathname } = new URL(url)
    const host = hostname.replace(/^www\./, '')
    const pathParts = pathname.split('/').filter(Boolean)
    return pathParts.length > 0 ? `${host}/${pathParts[0]}` : host
  } catch {
    return url
  }
}
