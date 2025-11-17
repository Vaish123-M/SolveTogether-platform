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

export function addSubmission({title, description, url, tags}){
  const items = readAll()
  const id = 's_' + Date.now()
  const newItem = { id, title, description, url, tags: tags||[], createdAt: new Date().toISOString(), ratings: [], feedback: [] }
  items.unshift(newItem)
  saveAll(items)
  return newItem
}

export function listSubmissions(){
  return readAll()
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

export function averageRating(item){
  if(!item || !item.ratings || item.ratings.length===0) return 0
  const sum = item.ratings.reduce((s,r)=>s + Number(r.score),0)
  return Math.round((sum / item.ratings.length) * 10) / 10
}

export function clearAll(){
  try{ localStorage.removeItem(LS_KEY); return true }catch(e){ return false }
}

export default { addSubmission, listSubmissions, addRating, addFeedback, averageRating, clearAll }
