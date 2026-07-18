import React, {useState} from 'react';

export default function App(){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function doSearch(){
    setLoading(true);
    try{
      const resp = await fetch('/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, top_k: 5})
      });
      const json = await resp.json();
      setResults(json.results || []);
    }catch(e){
      console.error(e);
      setResults([]);
    }finally{ setLoading(false); }
  }

  return (
    <div style={{fontFamily:'Arial, sans-serif', padding:20}}>
      <h2>Homeopathy EMR — Semantic Search (Demo)</h2>
      <div>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search clinical notes..." style={{width:'60%'}} />
        <button onClick={doSearch} disabled={loading} style={{marginLeft:8}}>Search</button>
      </div>
      <div style={{marginTop:20}}>
        {loading && <div>Searching...</div>}
        {results && results.length===0 && <div>No results</div>}
        {results && results.map(r => (
          <div key={r.note_id} style={{borderBottom:'1px solid #eee', padding:8}}>
            <strong>Note {r.note_id}</strong> — score: {r.score}
            <div>{r.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
