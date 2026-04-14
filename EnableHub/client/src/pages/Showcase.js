import React, { useEffect, useState } from 'react'
import * as svc from '../services/communityService'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Rating,
  Stack,
  TextField,
  Typography
} from '@mui/material'

export default function Showcase(){
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [rating, setRating] = useState(5)
  const [feedbackText, setFeedbackText] = useState('')

  useEffect(()=>{ setItems(svc.listSubmissions()) }, [])

  const submit = ()=>{
    if(!title || !description) return
    const t = tags.split(',').map(s=>s.trim()).filter(Boolean)
    const newItem = svc.addSubmission({ title, description, url, tags: t })
    setItems(prev=>[newItem, ...prev])
    setTitle(''); setUrl(''); setDescription(''); setTags('')
  }

  const doRate = (id, score)=>{
    svc.addRating(id, score)
    setItems(svc.listSubmissions())
  }

  const doFeedback = (id)=>{
    if(!feedbackText) return
    svc.addFeedback(id, 'User', feedbackText)
    setFeedbackText('')
    setItems(svc.listSubmissions())
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Community Solutions Showcase</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>Share accessibility tips, code snippets, and extensions. Rate ideas and discuss improvements with the community.</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 2 }}>
        <Box>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Submit a solution</Typography>
              <Stack spacing={1.5}>
                <TextField label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <TextField label="URL (optional)" value={url} onChange={(e)=>setUrl(e.target.value)} />
                <TextField label="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
                <TextField label="Description" multiline minRows={4} value={description} onChange={(e)=>setDescription(e.target.value)} />
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" onClick={submit}>Submit</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={1.5}>
            {items.length===0 && <Card><CardContent><Typography>No submissions yet. Be the first.</Typography></CardContent></Card>}
            {items.map(it=> (
              <Card key={it.id} variant="outlined">
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h6">{it.title}</Typography>
                    {it.tags?.length > 0 && <Chip size="small" label={it.tags[0]} />}
                  </Stack>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>{it.description}</Typography>
                  {it.url && <Button href={it.url} target="_blank" rel="noreferrer" size="small" variant="outlined">Open resource</Button>}

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mt: 1.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2">Rating:</Typography>
                      <Rating readOnly value={Number(svc.averageRating(it)) || 0} precision={0.5} />
                      <Typography variant="body2" fontWeight={700}>{svc.averageRating(it) || '0.0'}</Typography>
                    </Stack>
                    <Rating
                      name={`rate-${it.id}`}
                      value={rating}
                      onChange={(_, value)=>{
                        if(value){ setRating(value); doRate(it.id, value) }
                      }}
                      aria-label={`Rate solution ${it.title}`}
                    />
                  </Stack>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="subtitle2" color="text.secondary">Community feedback</Typography>
                    <TextField
                      multiline
                      minRows={2}
                      value={feedbackText}
                      onChange={(e)=>setFeedbackText(e.target.value)}
                      placeholder="Leave feedback for this solution"
                      sx={{ mt: 1 }}
                    />
                    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                      <Button variant="outlined" onClick={()=>doFeedback(it.id)}>Send</Button>
                    </Stack>
                    {it.feedback && it.feedback.length>0 && (
                      <Stack spacing={0.75} sx={{ mt: 1 }}>
                        {it.feedback.slice(0,3).map((f,idx)=>(
                          <Typography key={idx} variant="body2"><strong>{f.author}:</strong> {f.text}</Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Stack spacing={1.5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>How to write a good solution</Typography>
              <ul>
                <li>Be specific and actionable.</li>
                <li>Include links to tools or docs.</li>
                <li>Keep examples short and practical.</li>
                <li>Tag related categories like CSS, browser-extension, or dyslexia.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Community guidelines</Typography>
              <ul>
                <li>Be respectful and constructive.</li>
                <li>No malicious code.</li>
                <li>Prefer open-source or trusted tools.</li>
              </ul>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  )
}
