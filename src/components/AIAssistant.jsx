"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function AIAssistant(){
  const [messages, setMessages] = useState([{role:'assistant', content:'Halo! Saya siap membantu — coba minta bantuan coding atau debugging.'}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(()=>{ chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior:'smooth' }); }, [messages]);

  async function send(){
    const trimmed = input.trim(); if(!trimmed) return;
    const user = { role:'user', content: trimmed };
    setMessages(prev => [...prev, user]);
    setInput(''); setLoading(true);
    try{
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ model:'gpt-4o-mini', messages:[...messages, user] }) });
      const data = await res.json();
      const reply = data.reply || 'Maaf, tidak ada respons.';
      setMessages(prev => [...prev, { role:'assistant', content: reply }]);
    }catch(e){
      setMessages(prev => [...prev, { role:'assistant', content: 'Error: '+e.message }]);
    }finally{ setLoading(false); }
  }

  function downloadConversation(){
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'conversation.json'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="chat-wrap">
      <div className="messages" ref={chatRef}>
        {messages.map((m,i)=>(
          <div key={i} className={'msg '+(m.role==='user'?'user':'assistant')+' fade-in'}>
            <div style={{display:'flex',alignItems:'center'}}><div className='avatar' style={{background:'linear-gradient(135deg,#c084fc,#ec4899)'}}>{m.role==='user'?'U':'AI'}</div><div style={{fontSize:12, color:'rgba(229,231,235,0.8)', textTransform:'uppercase', marginBottom:6}}>{m.role}</div></div>
            <div style={{marginTop:8, whiteSpace:'pre-wrap'}}>{m.content}</div>
          </div>
        ))}
      </div>

      <div className="composer">
        <textarea className="input" placeholder="Tulis pesan..." value={input} onChange={(e)=>setInput(e.target.value)} />
        <div style={{display:'flex',flexDirection:'column', gap:8}}>
          <button className="btn" onClick={send} disabled={loading}>{loading ? 'Mengirim...' : 'Kirim'}</button>
          <button className="tab" onClick={downloadConversation} style={{padding:'8px 10px'}}>Download</button>
        </div>
      </div>
    </div>
  )
}