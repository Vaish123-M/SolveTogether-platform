import React, { useState, useRef } from 'react'
import * as svc from '../services/communityService'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'

const CATEGORIES = ['Hearing','Visual','Mobility','Cognitive','Speech','Neurodivergent']

export default function SubmitProblem(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [severity, setSeverity] = useState('minor')
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [listening, setListening] = useState(false)
  const [largeFont, setLargeFont] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const user = (()=>{ try{ return JSON.parse(localStorage.getItem('eh_user')) }catch(e){ return null } })()

  // voice-to-text using Web Speech API (best-effort)
  let recognition = null
  if(typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r=>r[0].transcript).join(' ')
      setDescription(prev => (prev ? prev + ' ' : '') + t)
      setListening(false)
    }
    recognition.onerror = (e) => { setError('Voice recognition error'); setListening(false) }
    recognition.onend = ()=> setListening(false)
  }

  const toggleListen = () => {
    if(!recognition) return setError('Voice recognition not supported in this browser.')
    if(listening){ recognition.stop(); setListening(false); }
    else{ try{ recognition.start(); setListening(true); }catch(e){ setError('Could not start voice recognition') } }
  }

  const onFiles = async (files) => {
    const out = []
    for(const f of files){
      try{
        const dataUrl = await new Promise((res, rej)=>{
          const reader = new FileReader()
          reader.onload = ()=>res(reader.result)
          reader.onerror = ()=>rej()
          reader.readAsDataURL(f)
        })
        out.push({ name: f.name, type: f.type, size: f.size, dataUrl })
      }catch(e){ console.warn('file read failed', e) }
    }
    setAttachments(prev=>[...prev, ...out])
  }

  const removeAttachment = (idx)=> setAttachments(prev=>prev.filter((_,i)=>i!==idx))

  const toggleTag = (tag)=> setTags(prev => prev.includes(tag) ? prev.filter(t=>t!==tag) : [...prev, tag])

  const submit = async (e) =>{
    e && e.preventDefault()
    setError(''); setStatusMsg('')
    if(!title || !description) return setError('Please add a title and describe your issue.')

    const payload = {
      title,
      description,
      tags: tags,
      severity,
      attachments,
      type: 'problem',
      author: user ? { email: user.email, name: user.username, role: user.role } : null,
      createdAt: new Date().toISOString()
    }

    try{
      const newItem = svc.addSubmission(payload)
      setStatusMsg('Thanks! Your problem is now visible to contributors. You’ll be notified when someone suggests a solution.')
      // small delay then navigate to showcase or to the new item view
      setTimeout(()=>{ navigate('/showcase') }, 1200)
    }catch(err){ setError('Could not submit — please try again.') }
  }

  return (
    <main className="page">
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>Describe your challenge</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Share clear steps, expected behavior, and accessibility impact. Contributors will respond with practical solutions.</Typography>

        <Card>
          <CardContent>
            <Box component="form" onSubmit={submit} className={largeFont ? 'large-font-form' : undefined}>
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  aria-label="Problem title"
                  placeholder="Short title (e.g., Captions lag behind audio)"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  InputProps={{ sx: { fontSize: largeFont ? 22 : 16 } }}
                />

                <TextField
                  label="Describe your issue"
                  aria-label="Problem description"
                  placeholder="Explain what happened, where it happened, and steps to reproduce"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  multiline
                  minRows={6}
                  InputProps={{ sx: { fontSize: largeFont ? 20 : 16 } }}
                />

                <Stack direction="row" spacing={1}>
                  <Button type="button" variant="outlined" onClick={toggleListen} aria-pressed={listening}>{listening ? 'Stop voice input' : 'Voice-to-text'}</Button>
                  <FormControlLabel control={<Switch checked={largeFont} onChange={()=>setLargeFont(v=>!v)} />} label="Large text mode" />
                </Stack>

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {CATEGORIES.map(c=> (
                      <Chip
                        key={c}
                        label={c}
                        clickable
                        color={tags.includes(c) ? 'primary' : 'default'}
                        variant={tags.includes(c) ? 'filled' : 'outlined'}
                        onClick={()=>toggleTag(c)}
                        aria-label={`Toggle category ${c}`}
                      />
                    ))}
                  </Stack>
                </Box>

                <FormControl>
                  <FormLabel id="severity-label">Severity / Priority</FormLabel>
                  <RadioGroup row aria-labelledby="severity-label" value={severity} onChange={(e)=>setSeverity(e.target.value)}>
                    <FormControlLabel value="minor" control={<Radio />} label="Minor inconvenience" />
                    <FormControlLabel value="major" control={<Radio />} label="Major barrier" />
                  </RadioGroup>
                </FormControl>

                <Box>
                  <Button component="label" variant="outlined">Attach files
                    <input ref={fileInputRef} type="file" multiple onChange={(e)=>onFiles(e.target.files)} hidden aria-label="Attach files" />
                  </Button>
                  {attachments.length > 0 && (
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      {attachments.map((a,i)=> (
                        <Stack key={i} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                          <Typography>{a.name} ({Math.round(a.size/1024)} KB)</Typography>
                          <Button type="button" size="small" onClick={()=>removeAttachment(i)}>Remove</Button>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Box>

                {error && <Alert severity="error" role="alert">{error}</Alert>}
                {statusMsg && <Alert severity="success" role="status">{statusMsg}</Alert>}

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Need help drafting? Start with one sentence about the barrier.</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button type="button" variant="outlined" onClick={()=>{ setTitle(''); setDescription(''); setTags([]); setAttachments([]); setSeverity('minor'); setStatusMsg(''); }}>Reset</Button>
                    <Button type="submit" variant="contained">Submit Problem</Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
