import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import * as svc from '../services/communityService'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material'

function ProblemCard({p, onOpen}){
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{p.title}</Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>{p.description}</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip size="small" label={`Context: ${p.learnerContext || 'General'}`} />
          <Chip size="small" label={`Status: ${p.status}`} color="primary" variant="outlined" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={()=>onOpen(p)} aria-label={`Open ${p.title}`}>Open</Button>
          <Button component={Link} to={`/showcase/${p.id}`} variant="outlined">View</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function ContributorDashboard(){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('eh_user')) || { username: 'Contributor', email: '' } }catch(e){ return { username: 'Contributor', email: '' } }
  })

  const [problems, setProblems] = useState([])
  const [category, setCategory] = useState('')
  const [urgency, setUrgency] = useState('')
  const [selected, setSelected] = useState(null)
  const [draft, setDraft] = useState('')
  const [attachments, setAttachments] = useState([])
  const [badges, setBadges] = useState([])

  useEffect(()=>{
    loadProblems()
    setBadges(svc.getBadges(user.email || 'anon'))
  }, [])

  function loadProblems(){
    const all = svc.listSubmissions()
    const list = all.filter(i=>i.type==='problem')
    setProblems(list)
  }

  const categories = useMemo(()=>{
    const set = new Set()
    problems.forEach(p=> set.add(p.category || 'General'))
    return Array.from(set)
  }, [problems])

  function applyFilters(){
    const f = {}
    if(category) f.category = category
    if(urgency) f.urgency = urgency
    setProblems(svc.listSubmissions(f))
  }

  function openProblem(p){
    setSelected(p)
    setDraft('')
    setAttachments([])
  }

  function onAttach(e){
    const files = Array.from(e.target.files || [])
    const readers = files.map(f=> new Promise(res => {
      const r = new FileReader()
      r.onload = ()=> res({ name: f.name, data: r.result })
      r.readAsDataURL(f)
    }))
    Promise.all(readers).then(list=> setAttachments(prev => prev.concat(list)))
  }

  function submitSolution(){
    if(!selected) return
    const sol = svc.addSolution(selected.id, { authorEmail: user.email, content: draft, attachments })
    // award first-solution badge if this is user's first solution
    const userSolutions = problems.reduce((acc,p)=> acc + (p.solutions ? p.solutions.filter(s=>s.authorEmail===user.email).length : 0), 0)
    if(userSolutions === 0) svc.awardBadge(user.email, 'First Solution')
    // award champion badge after 5 solutions
    const total = userSolutions + 1
    if(total >= 5) svc.awardBadge(user.email, 'Accessibility Champion')
    setBadges(svc.getBadges(user.email))
    loadProblems()
    setSelected(null)
    setDraft('')
    setAttachments([])
  }

  function submitComment(solutionId, text){
    if(!selected) return
    svc.addComment(selected.id, solutionId, { authorEmail: user.email, text })
    loadProblems()
  }

  function vote(solutionId, up=true){
    if(!selected) return
    svc.voteSolution(selected.id, solutionId, up)
    loadProblems()
  }

  function markHelpfulAction(solutionId){
    if(!selected) return
    svc.markHelpful(selected.id, solutionId, user.email)
    loadProblems()
  }

  // impact: number of learners helped (unique helpfulByLearners across their solutions)
  const impactCount = useMemo(()=>{
    const allSolutions = problems.flatMap(p => (p.solutions||[]).filter(s => s.authorEmail === user.email))
    const learners = new Set()
    allSolutions.forEach(s => (s.helpfulByLearners||[]).forEach(l => learners.add(l)))
    return learners.size
  }, [problems, user])

  return (
    <main className="page">
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>Contributor Dashboard</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Welcome, {user.username || user.email}. Solve real accessibility barriers with clear, high-contrast workflows.</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 2 }}>
          <Box>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }}>
                  <TextField select label="Category" value={category} onChange={e=>setCategory(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    {categories.map(c=> <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                  <TextField select label="Urgency" value={urgency} onChange={e=>setUrgency(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </TextField>
                  <Button variant="contained" onClick={applyFilters}>Apply filters</Button>
                </Stack>
              </CardContent>
            </Card>

            <Stack spacing={1.5}>
              {problems.length===0 && <Card><CardContent><Typography>No open problems yet. Invite learners to submit.</Typography></CardContent></Card>}
              {problems.map(p => <ProblemCard key={p.id} p={p} onOpen={openProblem} />)}
            </Stack>

            {selected && (
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Suggest Solution: {selected.title}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>{selected.description}</Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Accessibility hints</Typography>
                  <ul>
                    <li>Keep language clear and direct.</li>
                    <li>Explain assistive technology impact.</li>
                    <li>Provide implementation steps.</li>
                  </ul>
                  <TextField
                    label="Solution draft"
                    aria-label="Solution draft"
                    value={draft}
                    onChange={e=>setDraft(e.target.value)}
                    multiline
                    minRows={6}
                    placeholder="Explain your solution, steps, and rationale..."
                    sx={{ mt: 1 }}
                  />
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Button component="label" variant="outlined">Attach files
                      <input type="file" onChange={onAttach} hidden multiple />
                    </Button>
                    <Typography variant="body2" color="text.secondary">{attachments.length} attachment(s)</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Button variant="contained" onClick={submitSolution}>Suggest Solution</Button>
                    <Button variant="outlined" onClick={()=>setSelected(null)}>Cancel</Button>
                  </Stack>

                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Existing solutions</Typography>
                  <Stack spacing={1.5} sx={{ mt: 1 }}>
                    {(selected.solutions||[]).map(sol=> (
                      <Card key={sol.id} variant="outlined">
                        <CardContent>
                          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                            <Typography variant="body2"><strong>{sol.authorEmail}</strong> - {new Date(sol.createdAt).toLocaleString()}</Typography>
                            <Stack direction="row" spacing={1}>
                              <Button size="small" onClick={()=>vote(sol.id, true)}>▲ {sol.upvotes||0}</Button>
                              <Button size="small" onClick={()=>vote(sol.id, false)}>▼ {sol.downvotes||0}</Button>
                              <Button size="small" onClick={()=>markHelpfulAction(sol.id)}>Helpful</Button>
                            </Stack>
                          </Stack>
                          <Typography sx={{ mt: 1 }}>{sol.content}</Typography>
                          {(sol.comments||[]).map(c=> (
                            <Box key={c.id} sx={{ mt: 1, pl: 1.5, borderLeft: '3px solid', borderColor: 'divider' }}>
                              <Typography variant="body2"><strong>{c.authorEmail}</strong> - {new Date(c.createdAt).toLocaleString()}</Typography>
                              <Typography variant="body2">{c.text}</Typography>
                            </Box>
                          ))}
                          <CommentBox onSubmit={(txt)=>submitComment(sol.id, txt)} />
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Box>

          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Impact</Typography>
                <Typography>You have helped <strong>{impactCount}</strong> learner(s).</Typography>
                <Typography sx={{ mt: 1, fontWeight: 700 }}>Badges</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 1 }}>
                  {badges.length===0 ? <Typography variant="body2">No badges yet</Typography> : badges.map(b=> <Chip key={b} label={b} color="secondary" />)}
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6">Quick links</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Button component={Link} to="/showcase" variant="outlined">Community Showcase</Button>
                  <Button component={Link} to="/submit" variant="outlined">Invite learner submissions</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Container>
    </main>
  )
}

function CommentBox({onSubmit}){
  const [txt, setTxt] = useState('')
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
      <TextField aria-label="Comment" size="small" value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Add a comment" />
      <Button variant="outlined" onClick={()=>{ if(txt.trim()){ onSubmit(txt); setTxt('') } }}>Comment</Button>
    </Stack>
  )
}
