import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getRepoFile, putRepoFile } from "@/lib/github-admin";
export async function GET(){ if(!isAdmin()) return NextResponse.json({message:"Unauthorized"},{status:401}); try{const f=await getRepoFile("data/site-content.json"); return NextResponse.json(JSON.parse(Buffer.from(f.content,"base64").toString("utf8")));}catch{return NextResponse.json({about:{eyebrow:"About me",title:"",body:""},experience:[],certificates:[]});}}
export async function PUT(req:Request){if(!isAdmin()) return NextResponse.json({message:"Unauthorized"},{status:401}); try{const content=await req.json(); const current=await getRepoFile("data/site-content.json"); await putRepoFile("data/site-content.json",JSON.stringify(content,null,2)+"\n","admin: update portfolio content",current.sha); return NextResponse.json({ok:true});}catch(e){return NextResponse.json({message:e instanceof Error?e.message:"Save failed"},{status:500});}}
