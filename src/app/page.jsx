"use client";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import AIAssistant from "@/components/AIAssistant";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function HomePage(){
  const [mode, setMode] = useState("chat");
  return (
    <div className="page-wrap">
      <div className="card">
        <aside className="sidebar">
          <div className="brand"><div className="logo">AI</div><div style={{marginLeft:12}}><div style={{fontWeight:700}}>AI Assistant Pro</div><div className="small-muted">Playful • Coding</div></div></div>
          <div style={{marginTop:18}}>
            <div className="small-muted">Model</div>
            <select className="select-model" defaultValue="gpt-4o-mini">
              <option>gpt-4o-mini</option><option>gpt-4o</option><option>gpt-3.5-turbo</option>
            </select>
            <div style={{marginTop:12}} className="small-muted">Mode</div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className={'tab '+(mode==='chat'?'active':'')} onClick={()=>setMode('chat')}>Chat</button>
              <button className={'tab '+(mode==='code'?'active':'')} onClick={()=>setMode('code')}>Code</button>
            </div>
          </div>
        </aside>
        <main className="main">
          <div className="header">
            <div className="title">AI Assistant Pro</div>
            <div className="mode-tabs"><span className="small-muted">Theme: Playful</span></div>
          </div>

          {mode==='chat' ? <AIAssistant /> : (
            <div className="chat-wrap">
              <div className="editor-wrap">
                <MonacoEditor height="360" defaultLanguage="javascript" defaultValue={`// Mulai coding di sini\nfunction hello(){\n  console.log('Hello world')\n}`} />
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:8}}>
                  <button className="btn" onClick={()=>{alert('Download file...');}}>Download .js</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}