const LS_KEY = 'eh_community_showcase'

function readAll(){
  try{
    const raw = localStorage.getItem(LS_KEY)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){ return [] }
}

function saveAll(items){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(items)); return true }catch(e){ return false }
}

function makeId(prefix='s'){
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`
}

export function addSubmission({title, description, url, tags, category, urgency, learnerContext, attachments}){
  const items = readAll()
  const id = makeId('p')
  const newItem = {
    id,
    type: 'problem',
    status: 'open',
    title: title||'Untitled problem',
    description: description||'',
    url: url||'',
    tags: tags||[],
    category: category||'General',
    urgency: urgency||'normal',
    learnerContext: learnerContext||'',
    attachments: attachments||[],
    createdAt: new Date().toISOString(),
    ratings: [],
    feedback: [],
    solutions: []
  }
  items.unshift(newItem)
  saveAll(items)
  return newItem
}

export function listSubmissions(filter = {}){
  const items = readAll()
  if(!filter || Object.keys(filter).length===0) return items
  return items.filter(it => {
    if(filter.category && it.category !== filter.category) return false
    if(filter.urgency && it.urgency !== filter.urgency) return false
    if(filter.status && it.status !== filter.status) return false
    return true
  })
}

export function getSubmissionById(id){
  const items = readAll()
  return items.find(i=>i.id===id) || null
}

export function addRating(id, score){
  const items = readAll()
  const it = items.find(i=>i.id===id)
  if(!it) return false
  it.ratings.push({ score: Number(score), at: new Date().toISOString() })
  saveAll(items)
  return true
}

export function addFeedback(id, author, text){
  const items = readAll()
  const it = items.find(i=>i.id===id)
  if(!it) return false
  it.feedback.push({ author: author||'Anonymous', text, at: new Date().toISOString() })
  saveAll(items)
  return true
}

export function addSolution(problemId, { authorEmail, content, attachments }){
  const items = readAll()
  const it = items.find(i=>i.id===problemId)
  if(!it) return null
  const sol = {
    id: makeId('sol'),
    authorEmail: authorEmail||'anonymous',
    content: content||'',
    attachments: attachments||[],
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    helpfulByLearners: [],
    comments: []
  }
  it.solutions = it.solutions || []
  it.solutions.unshift(sol)
  // if a contributor posts a solution, mark problem as in-progress
  if(it.status === 'open') it.status = 'in-progress'
  saveAll(items)
  return sol
}

export function addComment(problemId, solutionId, { authorEmail, text }){
  const items = readAll()
  const it = items.find(i=>i.id===problemId)
  if(!it) return null
  const sol = it.solutions && it.solutions.find(s=>s.id===solutionId)
  if(!sol) return null
  const comment = { id: makeId('c'), authorEmail: authorEmail||'anonymous', text: text||'', createdAt: new Date().toISOString() }
  sol.comments = sol.comments || []
  sol.comments.push(comment)
  saveAll(items)
  return comment
}

export function voteSolution(problemId, solutionId, up=true){
  const items = readAll()
  const it = items.find(i=>i.id===problemId)
  if(!it) return null
  const sol = it.solutions && it.solutions.find(s=>s.id===solutionId)
  if(!sol) return null
  if(up) sol.upvotes = (sol.upvotes||0) + 1
  else sol.downvotes = (sol.downvotes||0) + 1
  saveAll(items)
  return sol
}

export function markHelpful(problemId, solutionId, learnerEmail){
  const items = readAll()
  const it = items.find(i=>i.id===problemId)
  if(!it) return null
  const sol = it.solutions && it.solutions.find(s=>s.id===solutionId)
  if(!sol) return null
  sol.helpfulByLearners = sol.helpfulByLearners || []
  if(!sol.helpfulByLearners.includes(learnerEmail)) sol.helpfulByLearners.push(learnerEmail)
  saveAll(items)
  return sol
}

export function awardBadge(contributorEmail, badge){
  try{
    const key = 'eh_badges_' + contributorEmail
    const raw = localStorage.getItem(key) || '[]'
    const list = JSON.parse(raw)
    if(!list.includes(badge)) list.push(badge)
    localStorage.setItem(key, JSON.stringify(list))
    return list
  }catch(e){ return [] }
}

export function getBadges(contributorEmail){
  try{
    const key = 'eh_badges_' + contributorEmail
    const raw = localStorage.getItem(key) || '[]'
    return JSON.parse(raw)
  }catch(e){ return [] }
}

export function clearAll(){
  try{ localStorage.removeItem(LS_KEY); return true }catch(e){ return false }
}

export default { addSubmission, listSubmissions, getSubmissionById, addRating, addFeedback, addSolution, addComment, voteSolution, markHelpful, awardBadge, getBadges, clearAll }
