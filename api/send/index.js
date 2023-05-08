import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json({ type: '*/*' }))

import webpush from 'web-push'

const defaultVapidDetails = {
  subject: 'mailto:example@yourdomain.org',
  publicKey: 'BDn0aUh8boxRCgcih2cM6m6dhjpaYpZ2URKK1UliqimKRg__j773SdixNsda8BqKdOPuQ5VDRwfMZ8YyVkBzr0s',
  privateKey: 'qdjnQsVshj8qgwXOQhgxfzzdosfp91AOroyir2dO__U',
}

const send = o => webpush.sendNotification(o.subscription, JSON.stringify(o.payload || { title: 'Hello' }), {
  vapidDetails: { ...defaultVapidDetails, ...o.vapidDetails },
  headers: { Urgency: 'high' },
  TTL: 0
})

app.get('/api/send', async (req, res) => {
  if (req.query.json) res.json(await send(JSON.parse(req.query.json)))
  else res.send()
})

app.post('/api/send', async (req, res) => {
  res.json(await send(req.body))
})

export default app
