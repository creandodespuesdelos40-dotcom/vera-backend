import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.get('/:share_token', async (req, res) => {
  const { share_token } = req.params

  const { data: album, error: albumErr } = await supabase
    .from('vera_albums')
    .select('id, name, description, cover_url, created_at')
    .eq('share_token', share_token)
    .eq('is_shared', true)
    .maybeSingle()

  if (albumErr) {
    console.error('getSharedAlbum:', albumErr)
    return res.status(500).json({ error: albumErr.message })
  }
  if (!album) return res.status(404).json({ error: 'Álbum no encontrado o privado' })

  const { data: memories, error: memErr } = await supabase
    .from('vera_memories')
    .select('*')
    .eq('album_id', album.id)
    .order('created_at', { ascending: true })

  if (memErr) {
    console.error('getSharedMemories:', memErr)
    return res.status(500).json({ error: memErr.message })
  }

  res.json({ album, memories })
})

export default router
