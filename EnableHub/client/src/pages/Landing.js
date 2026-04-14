import React from 'react'
import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Stack, Typography } from '@mui/material'

const ROLES = [
  {
    label: 'Learner',
    title: 'I am a disabled learner',
    desc: 'Find tailored resources, support paths, and contributors who can help.',
    href: '/onboarding/learner',
    tone: 'primary'
  },
  {
    label: 'Contributor',
    title: 'I am a contributor',
    desc: 'Help solve problems, mentor, and collaborate with learners.',
    href: '/onboarding/contributor',
    tone: 'secondary'
  },
  {
    label: 'Mentor',
    title: 'I am a mentor',
    desc: 'Offer guidance, run workshops, and support learning journeys.',
    href: '/onboarding/mentor',
    tone: 'success'
  },
  {
    label: 'Explorer',
    title: 'I want to explore',
    desc: 'Browse problems, learn by doing, and discover opportunities to help.',
    href: '/onboarding/explore',
    tone: 'warning'
  }
]

export default function Landing() {
  return (
    <main>
      <a className="skip-link" href="#main">Skip to content</a>
      <Box sx={{ background: 'linear-gradient(135deg, rgba(30,64,175,0.08), rgba(234,88,12,0.08))', py: 6 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>EnableHub: Learn together, belong together</Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780 }}>
                A warm, inclusive platform connecting disabled learners with contributors and mentors through accessible collaboration.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button href="/signup" variant="contained" size="large">Create account</Button>
                <Button href="/login" variant="outlined" size="large">Sign in</Button>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container id="roles" maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Choose your role</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
          {ROLES.map(role => (
            <Card key={role.label} variant="outlined" sx={{ borderWidth: 2 }}>
              <CardActionArea
                component="a"
                href={role.href}
                aria-label={role.title}
                sx={{ height: '100%', p: 1 }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h6">{role.title}</Typography>
                    <Chip label={role.label} color={role.tone} size="small" />
                  </Stack>
                  <Typography color="text.secondary">{role.desc}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>About EnableHub</Typography>
        <Typography color="text.secondary">We design with accessibility and emotional warmth in mind: inclusive onboarding, assistive workflows, and community-first learning.</Typography>
      </Container>
    </main>
  )
}
