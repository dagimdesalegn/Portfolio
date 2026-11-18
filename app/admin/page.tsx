"use client";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  LogOut, Plus, Trash2, Save, Mail, Award, BriefcaseBusiness, Pencil,
  Upload, Eye, EyeOff, UserRound, Sparkles, CheckCircle2, X, ShieldCheck,
  MapPin, CalendarDays, ExternalLink
} from "lucide-react";

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
  const [tab,setTab]=useState("about");
  const [status,setStatus]=useState("");
  const [editingExp,setEditingExp]=useState<string|null>(null);
  const [editingCert,setEditingCert]=useState<string|null>(null);
  const [editingAbout,setEditingAbout]=useState(false);
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
    if(r.ok){
      setStatus("Saved successfully. Public content will refresh shortly.");
      setEditingAbout(false); setEditingExp(null); setEditingCert(null);
      setTimeout(()=>setStatus(""),5000);
    } else {const j=await r.json();setStatus(j.message||"Save failed");}
  }

  function addExp(){
    const id=crypto.randomUUID();
    setContent(c=>({...c,experience:[...c.experience,{
      id,role:"",company:"",period:"",description:"",location:"",technologies:[],
      visible:true,order:c.experience.length+1
    }]}));
    setEditingExp(id);
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
      id,title:"",issuer:"",description:"",date:"",credentialId:"",credentialUrl:"",
      imageUrl:"",visible:true,order:c.certificates.length+1
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

  if(logged===null)return <main className="admin-shell grid min-h-screen place-items-center"><div className="admin-loading"><div className="admin-orb"/><p>Loading portfolio control…</p></div></main>;

  if(!logged)return (
    <main className="admin-shell grid min-h-screen place-items-center px-5 py-10">
      <form onSubmit={login} className="admin-login-card tibeb-grid w-full max-w-md rounded-[2rem] border border-habesha-gold/35 bg-white/85 p-7 shadow-tibeb sm:p-9">
        <div className="admin-brand"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-adwa-green text-habesha-gold"><ShieldCheck size={22}/></span><div><p className="text-xs font-black uppercase tracking-[.22em] text-terracotta">Private area</p><p className="mt-1 text-xs text-foreground/45">Portfolio management</p></div></div>
        <h1 className="mt-7 font-heading text-3xl font-bold text-adwa-green">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-foreground/50">Manage your public portfolio from one secure place.</p>
        <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="admin-input mt-7"/>
        <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" className="admin-input mt-3"/>
        <button className="admin-primary mt-5 w-full justify-center">Sign in</button>
        {status&&<p className="mt-3 text-center text-xs font-semibold text-terracotta">{status}</p>}
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

  const nav=[
    ["about","About",UserRound],["experience","Experience",BriefcaseBusiness],
    ["certificates","Certificates",Award],["messages","Messages",Mail]
  ];

  return (
    <main className="admin-shell min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-7 sm:py-8">
        <header className="admin-header rounded-[2rem] border border-habesha-gold/30 bg-white/75 p-5 shadow-tibeb sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="admin-logo grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-adwa-green text-habesha-gold"><Sparkles size={22}/></div>
              <div><p className="text-[10px] font-black uppercase tracking-[.24em] text-terracotta">Portfolio control</p><h1 className="mt-1 font-heading text-2xl font-bold text-adwa-green sm:text-3xl">Admin dashboard</h1><p className="mt-1 text-xs text-foreground/45">Edit your public profile without touching code.</p></div>
            </div>
            <button onClick={logout} className="admin-secondary w-full justify-center sm:w-auto"><LogOut size={15}/> Logout</button>
          </div>

          <nav className="admin-tabs mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {nav.map(([key,label,Icon]:any)=><button key={key} onClick={()=>setTab(key)} className={`admin-tab ${tab===key?"admin-tab-active":""}`}><Icon size={16}/><span>{label}</span>{key==="messages"&&messages.length>0?<b>{messages.length}</b>:null}</button>)}
          </nav>
        </header>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[.2em] text-terracotta">{tab==="about"?"Profile story":tab==="experience"?"Work history":tab==="certificates"?"Credentials":"Inbox"}</p><p className="mt-1 text-sm text-foreground/45">{tab==="about"?"Shape the About section visitors see.":tab==="experience"?"Create polished, editable experience cards.":tab==="certificates"?"Manage certificates, awards, and verification links.":"Read and manage contact messages."}</p></div>
          {tab!=="messages"&&<button onClick={save} className="admin-primary w-full justify-center sm:w-auto"><Save size={15}/> Save changes</button>}
        </div>

        {status&&<div className="admin-status mt-4"><CheckCircle2 size={15}/><span>{status}</span></div>}

        {tab==="about"&&<AboutManager content={content} setContent={setContent} editing={editingAbout} setEditing={setEditingAbout}/>}
        {tab==="experience"&&<ExperienceManager content={content} setContent={setContent} editingExp={editingExp} setEditingExp={setEditingExp} updateExp={updateExp} addExp={addExp}/>}
        {tab==="certificates"&&<CertificateManager content={content} setContent={setContent} editingCert={editingCert} setEditingCert={setEditingCert} updateCert={updateCert} addCert={addCert} uploadFile={uploadFile}/>}
        {tab==="messages"&&<Messages messages={messages} loadMessages={loadMessages}/>}
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

function AboutManager({content,setContent,editing,setEditing}:{content:Content;setContent:Dispatch<SetStateAction<Content>>;editing:boolean;setEditing:(v:boolean)=>void}){
  return <section className="mt-5">
    {!editing ? <article className="admin-content-card about-admin-card">
      <div className="about-admin-top"><span className="admin-icon bg-adwa-green text-habesha-gold"><UserRound size={20}/></span><div className="min-w-0 flex-1"><p className="admin-kicker">{content.about.eyebrow||"About me"}</p><h2 className="mt-1 font-heading text-2xl font-bold text-adwa-green sm:text-3xl">{content.about.title||"Your About title"}</h2></div><button onClick={()=>setEditing(true)} className="admin-edit"><Pencil size={14}/> Edit</button></div>
      <div className="about-preview"><div className="about-preview-line"/><p className="whitespace-pre-line text-sm leading-7 text-foreground/60 sm:text-base sm:leading-8">{content.about.body||"Add your story, background, interests, and what you build."}</p></div>
      <div className="about-admin-footer"><span><Sparkles size={13}/> Public About section</span><span>Ready to publish</span></div>
    </article> : <article className="admin-content-card">
      <div className="admin-card-head"><div><p className="admin-kicker">Edit About</p><h2 className="font-heading text-xl font-bold text-adwa-green">Tell your story</h2></div><button onClick={()=>setEditing(false)} className="admin-close"><X size={16}/></button></div>
      <div className="grid gap-4">
        <label className="admin-field"><span>Eyebrow</span><input value={content.about.eyebrow} onChange={e=>setContent({...content,about:{...content.about,eyebrow:e.target.value}})} placeholder="About me" className="admin-input"/></label>
        <label className="admin-field"><span>Title</span><input value={content.about.title} onChange={e=>setContent({...content,about:{...content.about,title:e.target.value}})} placeholder="A developer focused on..." className="admin-input"/></label>
        <label className="admin-field"><span>About text</span><textarea value={content.about.body} onChange={e=>setContent({...content,about:{...content.about,body:e.target.value}})} placeholder="Write your story. Leave a blank line between paragraphs." className="admin-input min-h-52"/></label>
      </div>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button onClick={()=>setEditing(false)} className="admin-secondary justify-center">Cancel</button><button onClick={()=>setEditing(false)} className="admin-primary justify-center">Done editing</button></div>
    </article>}
  </section>
}

function ExperienceManager({content,setContent,editingExp,setEditingExp,updateExp,addExp}:{content:Content;setContent:Dispatch<SetStateAction<Content>>;editingExp:string|null;setEditingExp:(v:string|null)=>void;updateExp:(i:number,p:Partial<Experience>)=>void;addExp:()=>void}){
  return <section className="mt-5 space-y-4">
    {content.experience.length===0&&<Empty text="No experience yet. Add your first professional entry."/>}
    {content.experience.map((x,i)=>editingExp===x.id?
      <article key={x.id} className="admin-content-card">
        <div className="admin-card-head"><div><p className="admin-kicker">Experience {String(i+1).padStart(2,"0")}</p><h2 className="font-heading text-xl font-bold text-adwa-green">Edit experience</h2></div><button onClick={()=>setEditingExp(null)} className="admin-close"><X size={16}/></button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="admin-field"><span>Role / position</span><input value={x.role} onChange={e=>updateExp(i,{role:e.target.value})} placeholder="Software Engineer" className="admin-input"/></label>
          <label className="admin-field"><span>Company / organization</span><input value={x.company} onChange={e=>updateExp(i,{company:e.target.value})} placeholder="Company name" className="admin-input"/></label>
          <label className="admin-field"><span>Period</span><input value={x.period} onChange={e=>updateExp(i,{period:e.target.value})} placeholder="September 2026 – Present" className="admin-input"/></label>
          <label className="admin-field"><span>Location</span><input value={x.location||""} onChange={e=>updateExp(i,{location:e.target.value})} placeholder="Remote / Addis Ababa" className="admin-input"/></label>
          <label className="admin-field md:col-span-2"><span>Description</span><textarea value={x.description} onChange={e=>updateExp(i,{description:e.target.value})} placeholder="Describe your responsibilities and impact." className="admin-input min-h-32"/></label>
          <label className="admin-field md:col-span-2"><span>Technologies</span><input value={(x.technologies||[]).join(", ")} onChange={e=>updateExp(i,{technologies:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} placeholder="Next.js, TypeScript, PHP" className="admin-input"/></label>
          <label className="admin-field"><span>Display order</span><input type="number" value={x.order??i+1} onChange={e=>updateExp(i,{order:Number(e.target.value)})} className="admin-input"/></label>
        </div>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button onClick={()=>setEditingExp(null)} className="admin-secondary justify-center">Done editing</button><button onClick={()=>setEditingExp(null)} className="admin-primary justify-center"><CheckCircle2 size={15}/> Keep changes</button></div>
      </article>
      :
      <article key={x.id} className={`admin-content-card experience-admin-card ${x.visible===false?"opacity-55":""}`}>
        <div className="admin-card-head">
          <div className="flex min-w-0 items-start gap-3"><span className="admin-icon bg-adwa-green text-habesha-gold"><BriefcaseBusiness size={19}/></span><div className="min-w-0"><p className="admin-kicker">Experience {String(i+1).padStart(2,"0")}</p><h2 className="mt-1 truncate font-heading text-xl font-bold text-adwa-green">{x.role||"New experience"}</h2><p className="mt-0.5 truncate text-sm font-semibold text-terracotta">{x.company||"Company not set"}</p></div></div>
          <div className="flex shrink-0 gap-2"><button onClick={()=>updateExp(i,{visible:x.visible===false})} className="admin-square" title={x.visible===false?"Show":"Hide"}>{x.visible===false?<EyeOff size={15}/>:<Eye size={15}/>}</button><button onClick={()=>setEditingExp(x.id)} className="admin-edit"><Pencil size={14}/> <span className="hidden sm:inline">Edit</span></button><button onClick={()=>setContent(c=>({...c,experience:c.experience.filter(y=>y.id!==x.id)}))} className="admin-delete"><Trash2 size={15}/></button></div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{x.period&&<span className="admin-chip"><CalendarDays size={12}/>{x.period}</span>}{x.location&&<span className="admin-chip"><MapPin size={12}/>{x.location}</span>}</div>
        {x.description&&<p className="mt-5 whitespace-pre-line text-sm leading-7 text-foreground/55">{x.description}</p>}
        {x.technologies?.length?<div className="mt-5 flex flex-wrap gap-2">{x.technologies.map(t=><span key={t} className="rounded-full bg-adwa-green/7 px-2.5 py-1 text-[10px] font-bold text-adwa-green">{t}</span>)}</div>:null}
        <div className="admin-card-footer"><span>{x.visible===false?"Hidden from public":"Visible on public portfolio"}</span><span>Order {x.order??i+1}</span></div>
      </article>
    )}
    <button onClick={addExp} className="admin-add-card"><Plus size={16}/> Add experience</button>
  </section>
}

function CertificateManager({content,setContent,editingCert,setEditingCert,updateCert,addCert,uploadFile}:{content:Content;setContent:Dispatch<SetStateAction<Content>>;editingCert:string|null;setEditingCert:(v:string|null)=>void;updateCert:(i:number,p:Partial<Certificate>)=>void;addCert:()=>void;uploadFile:(file:File,i:number)=>void}){
  return <section className="mt-5 space-y-4">
    {content.certificates.length===0&&<Empty text="No certificates yet. Add your first credential or award."/>}
    {content.certificates.map((x,i)=>editingCert===x.id?
      <article key={x.id} className="admin-content-card">
        <div className="admin-card-head"><div><p className="admin-kicker">Certificate {String(i+1).padStart(2,"0")}</p><h2 className="font-heading text-xl font-bold text-adwa-green">Edit credential</h2></div><button onClick={()=>setEditingCert(null)} className="admin-close"><X size={16}/></button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="admin-field"><span>Certificate / award title</span><input value={x.title} onChange={e=>updateCert(i,{title:e.target.value})} placeholder="Certificate title" className="admin-input"/></label>
          <label className="admin-field"><span>Issuer / organization</span><input value={x.issuer} onChange={e=>updateCert(i,{issuer:e.target.value})} placeholder="Any provider, university, company..." className="admin-input"/></label>
          <label className="admin-field"><span>Issue date</span><input value={x.date||""} onChange={e=>updateCert(i,{date:e.target.value})} placeholder="March 2025" className="admin-input"/></label>
          <label className="admin-field"><span>Credential ID</span><input value={x.credentialId||""} onChange={e=>updateCert(i,{credentialId:e.target.value})} placeholder="Optional" className="admin-input"/></label>
          <label className="admin-field md:col-span-2"><span>Description</span><textarea value={x.description||""} onChange={e=>updateCert(i,{description:e.target.value})} placeholder="Optional description or achievement." className="admin-input min-h-28"/></label>
          <label className="admin-field md:col-span-2"><span>Credential / verification URL</span><input value={x.credentialUrl||""} onChange={e=>updateCert(i,{credentialUrl:e.target.value})} placeholder="https://..." className="admin-input"/></label>
          <label className="admin-field md:col-span-2"><span>Image URL (optional)</span><input value={x.imageUrl||""} onChange={e=>updateCert(i,{imageUrl:e.target.value})} placeholder="Leave empty if uploading below" className="admin-input"/></label>
          <label className="admin-upload md:col-span-2"><Upload size={17}/><div><b>Upload certificate image</b><p>JPG, PNG, or WebP · up to 5MB</p></div><input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)uploadFile(f,i)}}/></label>
          {x.imageUrl&&<div className="overflow-hidden rounded-2xl border border-habesha-gold/25 bg-background p-2 md:col-span-2"><img src={x.imageUrl} alt="" className="max-h-80 w-full rounded-xl object-contain"/></div>}
          <label className="admin-field"><span>Display order</span><input type="number" value={x.order??i+1} onChange={e=>updateCert(i,{order:Number(e.target.value)})} className="admin-input"/></label>
        </div>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button onClick={()=>setEditingCert(null)} className="admin-secondary justify-center">Done editing</button><button onClick={()=>setEditingCert(null)} className="admin-primary justify-center"><CheckCircle2 size={15}/> Keep changes</button></div>
      </article>
      :
      <article key={x.id} className={`admin-content-card certificate-admin-card ${x.visible===false?"opacity-55":""}`}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="admin-cert-thumb">{x.imageUrl?<img src={x.imageUrl} alt="" />:<div><Award size={25}/><span>No image</span></div>}</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><p className="admin-kicker">{x.issuer||"Credential"}</p><h2 className="mt-1 font-heading text-xl font-bold text-adwa-green">{x.title||"New certificate"}</h2></div><div className="flex shrink-0 gap-2"><button onClick={()=>updateCert(i,{visible:x.visible===false})} className="admin-square" title={x.visible===false?"Show":"Hide"}>{x.visible===false?<EyeOff size={15}/>:<Eye size={15}/>}</button><button onClick={()=>setEditingCert(x.id)} className="admin-edit"><Pencil size={14}/> <span className="hidden sm:inline">Edit</span></button><button onClick={()=>setContent(c=>({...c,certificates:c.certificates.filter(y=>y.id!==x.id)}))} className="admin-delete"><Trash2 size={15}/></button></div></div>
            <div className="mt-4 flex flex-wrap gap-2">{x.date&&<span className="admin-chip"><CalendarDays size={12}/>{x.date}</span>}{x.credentialUrl&&<span className="admin-chip"><ShieldCheck size={12}/>Verified link</span>}{x.credentialId&&<span className="admin-chip">ID: {x.credentialId}</span>}</div>
            {x.description&&<p className="mt-4 text-sm leading-6 text-foreground/55">{x.description}</p>}
            {x.credentialUrl&&<a href={x.credentialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-terracotta hover:text-adwa-green">Open credential <ExternalLink size={12}/></a>}
          </div>
        </div>
        <div className="admin-card-footer"><span>{x.visible===false?"Hidden from public":"Visible on public portfolio"}</span><span>Order {x.order??i+1}</span></div>
      </article>
    )}
    <button onClick={addCert} className="admin-add-card"><Plus size={16}/> Add certificate / award</button>
  </section>
}

function Messages({messages,loadMessages}:{messages:any[];loadMessages:()=>void}){
  return <section className="mt-5 space-y-3">
    {messages.length===0?<Empty text="No contact messages found."/>:messages.map(m=><article key={m.id} className="admin-content-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-heading text-lg font-bold text-adwa-green">{m.name}</p><p className="mt-1 text-xs text-foreground/45">{m.email} · {new Date(m.created_at).toLocaleString()}</p></div><button onClick={async()=>{await fetch("/api/admin/messages",{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({id:m.id})});loadMessages();}} className="admin-delete"><Trash2 size={15}/></button></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground/65">{m.message}</p>
    </article>)}
  </section>
}

function Empty({text}:{text:string}){return <div className="admin-empty"><div className="admin-empty-icon"><Sparkles size={20}/></div><p>{text}</p></div>}
function Empty({text}:{text:string}){
  return <div className="rounded-2xl border border-dashed border-habesha-gold/35 bg-white/60 p-7 text-center text-sm text-foreground/50">{text}</div>;
}
