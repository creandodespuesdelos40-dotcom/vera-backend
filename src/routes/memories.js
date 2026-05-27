import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.post('/', async (req, res) => {
  const { user_id, album_id, type, file_url, caption, emotion, person_id } = req.body
  if (!user_id || !album_id || !type) return res.status(400).json({ error: 'user_id, album_id y type son requeridos' })

  const VALID_TYPES = ['photo', 'video', 'audio', 'text']
  if (!VALID_TYPES.includes(type)) return res.status(400).json({ error: `type debe ser uno de: ${VALID_TYPES.join(', ')}` })

  const { data, error } = await supabase
    .from('vera_memories')
    .insert({
      user_id,
      album_id,
      type,
      file_url: file_url || null,
      caption: caption?.trim() || null,
      emotion: emotion?.trim() || null,
      person_id: person_id || null,
    })
    .select()
    .single()

  if (error) {
    console.error('createMemory:', error)
    return res.status(500).json({ error: error.message })
  }
  res.status(201).json(data)
})

export default router
