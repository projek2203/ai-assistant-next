"use client";
import React, { useState, useEffect, useRef } from 'react';
export default function AIAssistant(){
  const [model, setModel] = useState('gpt-4o-mini');
  const [messages, setMessages] = useState([{role:'assistant', content:'Hai! Saya siap membantu.'}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  useEffect(()=>{ chatRef.current?.scrollTo({top: chatRef.current.scrollHeight, behavior:'smooth'}); }, [messages]);

  async function send(){
    const trimmed = input.trim(); if(!trimmed) return;
    const user = {role:'user', content:trimmed};
    setMessages(prev => [...prev, user]);
    setInput(''); setLoading(true);
    try{
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({model, messages:[...messages, user]}) });
      const data = await res.json();
      const reply = data.reply || 'Error';
      setMessages(prev => [...prev, {role:'assistant', content:reply}]);
    }catch(e){ setMessages(prev => [...prev, {role:'assistant', content:'Error: '+e.message}]); }
    finally{ setLoading(false); }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-6'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-6'>
        <aside className='bg-slate-900/40 backdrop-blur rounded-2xl p-6'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center font-bold'>AI</div>
            <div><div className='font-semibold'>AI Assistant — Keren</div><div className='text-sm text-slate-400'>Terintegrasi OpenAI (proxy)</div></div>
          </div>
          <div className='mt-6 space-y-3'>
            <label className='block text-sm text-slate-300'>Pilih model</label>
            <select value={model} onChange={e=>setModel(e.target.value)} className='w-full rounded-lg p-2 bg-slate-800 border border-slate-700'>
              <option>gpt-4o-mini</option><option>gpt-4o</option><option>gpt-3.5-turbo</option>
            </select>
          </div>
        </aside>
        <main className='flex flex-col gap-4'>
          <div ref={chatRef} className='flex-1 overflow-auto rounded-2xl p-6 bg-slate-900/30 backdrop-blur' style={{minHeight:420}}>
            {messages.map((m,i)=>(<div key={i} className={'mb-4 max-w-[85%] p-3 rounded-lg '+(m.role==='user'?'ml-auto bg-purple-600/20':'bg-slate-800/40')}><div className='text-xs text-slate-400 uppercase'>{m.role}</div><div className='mt-1 whitespace-pre-wrap'>{m.content}</div></div>))}
          </div>
          <div className='flex gap-3 items-end'>
            <textarea value={input} onChange={e=>setInput(e.target.value)} rows={3} className='flex-1 resize-none p-3 rounded-lg bg-slate-800 border border-slate-700' placeholder='Tulis pesan...'></textarea>
            <button onClick={send} className='px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500'>{loading?'Mengirim...':'Kirim'}</button>
          </div>
        </main>
      </div>
    </div>
  );
}