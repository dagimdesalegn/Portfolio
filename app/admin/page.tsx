"use client";

import { useEffect, useState } from "react";
import {
  LogOut, Plus, Trash2, Save, Mail, Award, BriefcaseBusiness, Pencil, Upload, Eye, EyeOff
} from "lucide-react";

type Experience = {
  id:string; role:string; company:string; period:string; description:string;
  location?:string; technologies?:string[]; visible?:boolean; order?:number;
};
type Certificate = {
  id:string; title:string; issuer:string; description?:string; date?:string;
  credentialId?:string; credentialUrl?:string; imageUrl?:string; visible?:boolean; order?:number;
};
type Content = {
  about:{eyebrow:string;title:string;body:string};
  experience:Experience[];
  certificates:Certificate[];
};

const empty:Content={about:{eyebrow:"About me",title:"",body:""},experience:[],certificates:[]};

export default function AdminPage(){
  const [logged,setLogged]=useState<boolean|null>(null);
  const [u,setU]=useState(""); const [p,setP]=useState("");
  const [content,setContent]=useState<Content>(empty);
  const [messages,setMessages]=useState<any[]>([]);
  const [tab,setTab]=useState("experience"); const [status,setStatus]=useState(""); const [editingCert,setEditingCert]=useState<string|null>(null);

  useEffect(()=>{
    fetch("/api/admin/content").then(async r=>{
      if(r.ok){setLogged(true);setContent(await r.json());loadMessages();}
      else setLogged(false);
    });
  },[]);

  async function loadMessages(){const r=await fetch("/api/admin/messages");if(r.ok)setMessages(await r.json());}

  async function login(e:any){
    e.preventDefault();setStatus("Signing in...");
    const r=await fetch("/api/admin/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:u,password:p})});
    if(!r.ok){setStatus("Invalid credentials");return;}
    setLogged(true);setStatus("");
    const c=await fetch("/api/admin/content");if(c.ok)setContent(await c.json());loadMessages();
  }

  async function uploadFile(file:File,i:number){
    setStatus("Uploading certificate image...");
    const fd=new FormData();fd.append("file",file);
    const r=await fetch("/api/admin/upload",{method:"POST",body:fd});
    const j=await r.json();
    if(!r.ok){setStatus(j.message||"Upload failed");return;}
    setContent(c=>{const a=[...c.certificates];a[i]={...a[i],imageUrl:j.url};return {...c,certificates:a};});
    setStatus("Image uploaded. Save changes to publish it.");
  }

  async function save(){
    setStatus("Saving to GitHub...");
    const r=await fetch("/api/admin/content",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(content)});
    if(r.ok){setStatus("Saved to GitHub. Vercel will update the public content shortly.");}
    else {const j=await r.json();setStatus(j.message||"Save failed");}
  }

  function addExp(){
    setContent(c=>({...c,experience:[...c.experience,{
      id:crypto.randomUUID(),role:"",company:"",period:"",description:"",
      location:"",technologies:[],visible:true,order:c.experience.length+1
    }]}));
  }

  function addCert(){
    const id=crypto.randomUUID();
    setContent(c=>({...c,certificates:[...c.certificates,{
      id,title:"",issuer:"",description:"",date:"",
      credentialId:"",credentialUrl:"",imageUrl:"",visible:true,order:c.certificates.length+1
    }]}));
    setEditingCert(id);
  }

  function updateCert(i:number, patch:Partial<Certificate>){
    setContent(c=>{const a=[...c.certificates];a[i]={...a[i],...patch};return {...c,certificates:a};});
  }

  function updateExp(i:number, patch:Partial<Experience>){
    setContent(c=>{const a=[...c.experience];a[i]={...a[i],...patch};return {...c,experience:a};});
  }

  async function logout(){await fetch("/api/admin/logout",{method:"POST"});location.href="/admin";}

  if(logged===null)return <main className="grid min-h-screen place-items-center bg-background text-foreground">Loading...</main>;

  if(!logged)return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <form onSubmit={login} className="tibeb-grid w-full max-w-md rounded-[2rem] border border-habesha-gold/35 bg-white/75 p-7 shadow-tibeb">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-terracotta">Private area</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-adwa-green">Admin login</h1>
        <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="mt-7 w-full rounded-xl border border-habesha-gold/30 bg-white px-4 py-3 outline-none focus:border-terracotta"/>
        <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" className="mt-3 w-full rounded-xl border border-habesha-gold/30 bg-white px-4 py-3 outline-none focus:border-terracotta"/>
        <button className="mt-5 w-full rounded-xl bg-adwa-green px-4 py-3 font-bold text-white">Sign in</button>
        {status&&<p className="mt-3 text-center text-xs text-terracotta">{status}</p>}
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-terracotta">Portfolio control</p><h1 className="mt-1 font-heading text-3xl font-bold text-adwa-green">Admin dashboard</h1></div>
          <button onClick={logout} className="inline-flex w-fit items-center gap-2 rounded-xl border border-habesha-gold/35 px-4 py-2.5 text-sm font-bold text-adwa-green"><LogOut size={15}/> Logout</button>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-1">
          {[["experience","Experience",BriefcaseBusiness],["certificates","Certificates",Award],["messages","Messages",Mail],["about","About",null]].map(([key,label,Icon]:any)=>
            <button key={key} onClick={()=>setTab(key)} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold ${tab===key?"border-habesha-gold bg-adwa-green text-white":"border-habesha-gold/30 bg-white text-adwa-green"}`}>
              {Icon&&<Icon size={15}/>} {label}
            </button>
          )}
        </div>

        {tab==="experience"&&<section className="mt-6 space-y-4">
          {content.experience.length===0&&<Empty text="No experience yet. Add your first entry."/>}
          {content.experience.map((x,i)=><div key={x.id} className="rounded-2xl border border-habesha-gold/30 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-heading font-bold text-adwa-green">{x.role||"New experience"}</p>
              <div className="flex gap-2">
                <button onClick={()=>updateExp(i,{visible:x.visible===false})} className="rounded-lg border border-habesha-gold/30 p-2 text-adwa-green" title={x.visible===false?"Show":"Hide"}>{x.visible===false?<EyeOff size={15}/>:<Eye size={15}/>}</button>
                <button onClick={()=>setContent(c=>({...c,experience:c.experience.filter(y=>y.id!==x.id)}))} className="rounded-lg border border-terracotta/20 p-2 text-terracotta"><Trash2 size={15}/></button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <input value={x.role} onChange={e=>updateExp(i,{role:e.target.value})} placeholder="Role" className="admin-input"/>
              <input value={x.company} onChange={e=>updateExp(i,{company:e.target.value})} placeholder="Company" className="admin-input"/>
              <input value={x.period} onChange={e=>updateExp(i,{period:e.target.value})} placeholder="Period" className="admin-input"/>
              <input value={x.location||""} onChange={e=>updateExp(i,{location:e.target.value})} placeholder="Location" className="admin-input"/>
              <textarea value={x.description} onChange={e=>updateExp(i,{description:e.target.value})} placeholder="Description" className="admin-input min-h-28 md:col-span-2"/>
              <input value={(x.technologies||[]).join(", ")} onChange={e=>updateExp(i,{technologies:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} placeholder="Technologies, comma separated" className="admin-input md:col-span-2"/>
              <input type="number" value={x.order??i+1} onChange={e=>updateExp(i,{order:Number(e.target.value)})} placeholder="Display order" className="admin-input"/>
            </div>
          </div>)}
          <button onClick={addExp} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-habesha-gold/45 px-4 py-3 text-sm font-bold text-adwa-green"><Plus size={15}/> Add experience</button>
        </section>}

        {tab==="certificates"&&<section className="mt-6 space-y-4">
          <div className="rounded-2xl border border-habesha-gold/30 bg-white p-5">
            <p className="font-heading text-lg font-bold text-adwa-green">Certificate manager</p>
            <p className="mt-1 text-sm leading-6 text-foreground/55">Upload an image directly here, or use only the credential URL. You do not need to manually place anything in the public assets folder.</p>
          </div>
          {content.certificates.length===0&&<Empty text="No certificates yet. Add your first credential."/>}
          {content.certificates.map((x,i)=><div key={x.id} className="rounded-2xl border border-habesha-gold/30 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div><p className="font-heading font-bold text-adwa-green">{x.title||"New certificate"}</p><p className="text-xs text-foreground/45">{x.issuer||"Issuer not set"}</p></div>
              <div className="flex gap-2">
                <button onClick={()=>updateCert(i,{visible:x.visible===false})} className="rounded-lg border border-habesha-gold/30 p-2 text-adwa-green" title={x.visible===false?"Show":"Hide"}>{x.visible===false?<EyeOff size={15}/>:<Eye size={15}/>}</button>
                <button onClick={()=>setEditingCert(editingCert===x.id?null:x.id)} className="inline-flex items-center gap-1 rounded-lg border border-habesha-gold/30 px-3 py-2 text-xs font-bold text-adwa-green"><Pencil size={13}/> {editingCert===x.id?"Done":"Edit"}</button>
                <button onClick={()=>setContent(c=>({...c,certificates:c.certificates.filter(y=>y.id!==x.id)}))} className="rounded-lg border border-terracotta/20 p-2 text-terracotta"><Trash2 size={15}/></button>
              </div>
            </div>
            {editingCert===x.id ? <div className="grid gap-3 md:grid-cols-2">
              <input value={x.title} onChange={e=>updateCert(i,{title:e.target.value})} placeholder="Certificate / award title" className="admin-input"/>
              <input value={x.issuer} onChange={e=>updateCert(i,{issuer:e.target.value})} placeholder="Issuer (Coursera, Udemy, Udacity, University...)" className="admin-input"/>
              <input value={x.date||""} onChange={e=>updateCert(i,{date:e.target.value})} placeholder="Issue date" className="admin-input"/>
              <input value={x.credentialId||""} onChange={e=>updateCert(i,{credentialId:e.target.value})} placeholder="Credential ID (optional)" className="admin-input"/>
              <textarea value={x.description||""} onChange={e=>updateCert(i,{description:e.target.value})} placeholder="Description / achievement (optional)" className="admin-input min-h-24 md:col-span-2"/>
              <input value={x.credentialUrl||""} onChange={e=>updateCert(i,{credentialUrl:e.target.value})} placeholder="Credential / verification URL (optional)" className="admin-input md:col-span-2"/>
              <input value={x.imageUrl||""} onChange={e=>updateCert(i,{imageUrl:e.target.value})} placeholder="Image URL (optional — upload below if you prefer)" className="admin-input md:col-span-2"/>
              <label className="admin-input flex cursor-pointer items-center justify-center gap-2 font-semibold text-adwa-green">
                <Upload size={15}/> Upload certificate image
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)uploadFile(f,i)}}/>
              </label>
              {x.imageUrl&&<div className="overflow-hidden rounded-xl border border-habesha-gold/25 md:col-span-2"><img src={x.imageUrl} alt="" className="max-h-72 w-full object-contain bg-background"/></div>}
              <input type="number" value={x.order??i+1} onChange={e=>updateCert(i,{order:Number(e.target.value)})} placeholder="Display order" className="admin-input"/>
            </div> : <div className="rounded-xl border border-habesha-gold/20 bg-background/50 p-4">
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <p><span className="text-foreground/40">Date:</span> {x.date||"—"}</p>
                <p><span className="text-foreground/40">Credential:</span> {x.credentialUrl?"Ready":"—"}</p>
                <p className="sm:col-span-2"><span className="text-foreground/40">Image:</span> {x.imageUrl?"Uploaded":"Automatic credential preview if a verification URL is provided"}</p>
              </div>
            </div>}
          </div>)}
          <button onClick={addCert} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-habesha-gold/45 px-4 py-3 text-sm font-bold text-adwa-green"><Plus size={15}/> Add certificate</button>
        </section>}

        {tab==="about"&&<section className="mt-6 rounded-2xl border border-habesha-gold/30 bg-white p-5">
          <div className="grid gap-3">
            <input value={content.about.eyebrow} onChange={e=>setContent({...content,about:{...content.about,eyebrow:e.target.value}})} placeholder="Eyebrow" className="admin-input"/>
            <input value={content.about.title} onChange={e=>setContent({...content,about:{...content.about,title:e.target.value}})} placeholder="Title" className="admin-input"/>
            <textarea value={content.about.body} onChange={e=>setContent({...content,about:{...content.about,body:e.target.value}})} placeholder="About text" className="admin-input min-h-40"/>
          </div>
        </section>}

        {tab==="messages"&&<section className="mt-6 space-y-3">
          {messages.length===0?<div className="rounded-2xl border border-habesha-gold/30 bg-white p-7 text-sm text-foreground/50">No messages found.</div>:messages.map(m=><div key={m.id} className="rounded-2xl border border-habesha-gold/30 bg-white p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div><p className="font-bold text-adwa-green">{m.name}</p><p className="text-xs text-foreground/45">{m.email} · {new Date(m.created_at).toLocaleString()}</p></div>
              <button onClick={async()=>{await fetch("/api/admin/messages",{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({id:m.id})});loadMessages();}} className="text-terracotta"><Trash2 size={15}/></button>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground/65">{m.message}</p>
          </div>)}
        </section>}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-foreground/45">{status}</p>
          <button onClick={save} className="inline-flex items-center justify-center gap-2 rounded-xl bg-adwa-green px-5 py-3 text-sm font-bold text-white"><Save size={15}/> Save changes</button>
        </div>
      </div>
    </main>
  );
}

function Empty({text}:{text:string}){
  return <div className="rounded-2xl border border-dashed border-habesha-gold/35 bg-white/60 p-7 text-center text-sm text-foreground/50">{text}</div>;
}
