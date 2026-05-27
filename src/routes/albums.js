import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.get('/', async (req, res) => {
  const { user_id } = req.query
  if (!user_id) return res.status(400).json({ error: 'user_id requerido' })

  const { data, error } = await supabase
    .from('vera_albums')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAlbums:', error)
    return res.status(500).json({ error: error.message })
  }
  res.json(data)
})

router.post('/', async (req, res) => {
  const { user_id, name, description } = req.body
  if (!user_id || !name) return res.status(400).json({ error: 'user_id y name son requeridos' })

  const { data, error } = await supabase
    .from('vera_albums')
    .insert({ user_id, name: name.trim(), description: description?.trim() || null })
    .select()
    .single()

  if (error) {
    console.error('createAlbum:', error)
    return res.status(500).json({ error: error.message })
  }
  res.status(201).json(data)
})

router.patch('/:album_id/share', async (req, res) => {
  const { album_id } = req.params
  const { is_shared } = req.body
  if (typeof is_shared !== 'boolean') return res.status(400).json({ error: 'is_shared debe ser boolean' })

  const { data, error } = await supabase
    .from('vera_albums')
    .update({ is_shared })
    .eq('id', album_id)
    .select()
    .single()

  if (error) {
    console.error('toggleShare:', error)
    return res.status(500).json({ error: error.message })
  }
  res.json(data)
})

router.get('/:album_id/memories', async (req, res) => {
  const { album_id } = req.params

  const { data, error } = await supabase
    .from('vera_memories')
    .select('*')
    .eq('album_id', album_id)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('getMemories:', error)
    return res.status(500).json({ error: error.message })
  }
  res.json(data)
})

router.patch('/:album_id/group', async (req, res) => {
  const { album_id } = req.params
  const { group_id } = req.body

  const { data, error } = await supabase
    .from('vera_albums')
    .update({ group_id: group_id || null })
    .eq('id', album_id)
    .select()
    .single()

  if (error) {
    console.error('setAlbumGroup:', error)
    return res.status(500).json({ error: error.message })
  }
  res.json(data)
})

export default router
