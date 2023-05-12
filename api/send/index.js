import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json({ type: '*/*' }))

import webpush from 'web-push'

const defaultVapidDetails = {
  subject: 'mailto:example@yourdomain.org',
  publicKey: 'BNW86N2jwla0y54f-BWYhzluv3lP4M6M3lSNGluO5QNS5s1pclPa_usujA-i84atwIOwVSzuV2yGHWs-HosuX1g',
  privateKey: 'NCnYjxPMQ12X6RxG1hwtX2hv8taePC1NhvArpO0Onf8',
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
