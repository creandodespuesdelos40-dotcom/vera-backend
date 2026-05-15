import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import capturesRouter from './routes/captures.js'
import peopleRouter from './routes/people.js'
import insightsRouter from './routes/insights.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/captures', capturesRouter)
app.use('/people', peopleRouter)
app.use('/insights', insightsRouter)

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => console.log(`Vera backend running on port ${PORT}`))
