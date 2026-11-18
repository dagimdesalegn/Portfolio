import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getAdminSupabase } from "@/lib/admin-supabase";
export async function GET(){if(!isAdmin())return NextResponse.json({message:"Unauthorized"},{status:401}); const {data,error}=await getAdminSupabase().from("contact_messages").select("id,name,email,message,created_at").order("created_at",{ascending:false}); if(error)return NextResponse.json({message:error.message},{status:500}); return NextResponse.json(data||[]);}
export async function DELETE(req:Request){if(!isAdmin())return NextResponse.json({message:"Unauthorized"},{status:401}); const {id}=await req.json().catch(()=>({})); if(!id)return NextResponse.json({message:"Missing id"},{status:400}); const {error}=await getAdminSupabase().from("contact_messages").delete().eq("id",id); if(error)return NextResponse.json({message:error.message},{status:500}); return NextResponse.json({ok:true});}
