module.exports.createOgMeta = (html, videoId, streams) => {
  const ogUrl = html.window.document.createElement('meta')
  ogUrl.setAttribute('property', 'og:url')
  ogUrl.setAttribute('content', (() => {
    const url = new URL(process.env.FRONTEND_HOST)
    url.pathname = '/watch'
    url.searchParams.set('v', videoId)
    return url.href
  })())

  const ogTitle = html.window.document.createElement('meta')
  ogTitle.setAttribute('property', 'og:title')
  ogTitle.setAttribute('content', streams.data.title)

  const ogImage = html.window.document.createElement('meta')
  ogImage.setAttribute('property', 'og:image')
  ogImage.setAttribute('content', streams.data.thumbnailUrl)

  return [ogUrl, ogTitle, ogImage]
}
