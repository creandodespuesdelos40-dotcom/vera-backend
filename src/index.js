import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import capturesRouter from './routes/captures.js'
import peopleRouter from './routes/people.js'
import insightsRouter from './routes/insights.js'
import albumsRouter from './routes/albums.js'
import memoriesRouter from './routes/memories.js'
import sharedRouter from './routes/shared.js'
import groupsRouter from './routes/groups.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/captures', capturesRouter)
app.use('/people', peopleRouter)
app.use('/insights', insightsRouter)
app.use('/albums', albumsRouter)
app.use('/memories', memoriesRouter)
app.use('/shared', sharedRouter)
app.use('/groups', groupsRouter)

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => console.log(`Vera backend running on port ${PORT}`))
