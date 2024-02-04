const { default: axios } = require('axios')
const express = require('express')

const { JSDOM } = require('jsdom')

const { createOgMeta } = require('./helpers')

if (!process.env.API_HOST || !process.env.FRONTEND_HOST) {
  console.error('This proxy requires API_HOST and FRONTEND_HOST to be set in the environment.')
  process.exit(1)
}

const app = express()

app.get('/watch', async (req, res) => {
  try {
    const { v: videoId } = req.query

    if (!videoId) {
      return res.redirect(process.env.FRONTEND_HOST)
    }

    const htmlUrl = new URL(process.env.FRONTEND_HOST)
    htmlUrl.pathname = 'watch'
    const frontEndResponse = await axios(htmlUrl.href)

    if (frontEndResponse.status >= 400) {
      res.status(500).send('Unexpected frontend server response')
    }

    const html = new JSDOM(frontEndResponse.data)

    const streamsUrl = new URL(process.env.API_HOST)
    streamsUrl.pathname = `/streams/${videoId}`
    const streams = await axios(streamsUrl.href)

    if (streams.status >= 400) {
      res.status(500).send('Unexpected API server response')
    }

    const ogMeta = createOgMeta(html, videoId, streams)
    if (!ogMeta || !ogMeta.length) return

    const oldMeta = [...html.window.document.head.querySelectorAll('meta[property]')]
    for (const om of oldMeta) {
      om.remove()
    }

    for (const tag of ogMeta) {
      html.window.document.head.appendChild(tag)
    }

    return res.send(html.serialize())
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

app.listen(process.env.PORT || 3000)
