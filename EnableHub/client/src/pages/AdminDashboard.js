import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Card, CardContent, Container, LinearProgress, Stack, Typography } from '@mui/material'

function Stat({label, value}){
  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign:'center' }}>
        <Typography variant="h4" fontWeight={800}>{value}</Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard(){
  let user = { username: 'Admin' }
  try{ user = JSON.parse(localStorage.getItem('eh_user')) || user }catch(e){}

  // Mock stats and reports — replace with real API calls in production
  const users = JSON.parse(localStorage.getItem('eh_users') || '[]')
  const activeLearners = users.filter(u => u.role === 'learner').length
  const activeContributors = users.filter(u => u.role === 'contributor').length
  const sessions = JSON.parse(localStorage.getItem('eh_community_showcase') || '[]').length

  // simple a11y heuristic examples
  const reports = [
    { id: 1, issue: 'Missing header landmark', count: 3 },
    { id: 2, issue: 'Interactive elements missing accessible name', count: 8 }
  ]

  return (
    <main className="page">
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>Platform Overview</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Welcome, {user.username}. Monitor platform activity and accessibility quality in one responsive grid.</Typography>

        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'repeat(3,1fr)' }, gap:1.5, mb:2 }}>
          <Stat label="Active Learners" value={activeLearners} />
          <Stat label="Active Contributors" value={activeContributors} />
          <Stat label="Sessions / Submissions" value={sessions} />
        </Box>

        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', lg:'2fr 1fr' }, gap:1.5 }}>
          <Stack spacing={1.5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Accessibility Compliance Snapshot</Typography>
                {reports.map(r => (
                  <Box key={r.id} sx={{ mb: 1.5 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="body2">{r.issue}</Typography>
                      <Typography variant="body2" fontWeight={700}>{r.count}</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={Math.min(100, r.count * 10)} aria-label={`${r.issue} chart`} />
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Content Moderation</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>Review submitted problems and solutions for inclusivity and safety.</Typography>
                <Button component={Link} to="/showcase" variant="contained">Open submissions</Button>
              </CardContent>
            </Card>
          </Stack>

          <Stack spacing={1.5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>User Management</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>Approve accounts, assign roles, and monitor activity.</Typography>
                <Button variant="outlined">Manage users</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Event Scheduling</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>Plan hackathons, workshops, and community events.</Typography>
                <Button variant="outlined">Create event</Button>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Container>
    </main>
  )
}
