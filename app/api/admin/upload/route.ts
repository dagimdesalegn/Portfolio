import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { putRepoFile, rawUrl } from "@/lib/github-admin";
export const runtime = "nodejs";
export async function POST(req:Request){
  if(!isAdmin()) return NextResponse.json({message:"Unauthorized"},{status:401});
  const form=await req.formData(); const file=form.get("file");
  if(!(file instanceof File)) return NextResponse.json({message:"No file"},{status:400});
  if(file.size>5*1024*1024) return NextResponse.json({message:"Image must be 5MB or smaller."},{status:400});
  if(!/^image\/(jpeg|png|webp|jpg)$/.test(file.type)) return NextResponse.json({message:"Only JPG, PNG, or WebP images are allowed."},{status:400});
  const safe=file.name.toLowerCase().replace(/[^a-z0-9._-]+/g,"-");
  const path=`public/assets/certificates/${Date.now()}-${safe}`;
  try{await putRepoFile(path,Buffer.from(await file.arrayBuffer()),`admin: add certificate image ${safe}`);return NextResponse.json({ok:true,url:rawUrl(path)});}catch(e){return NextResponse.json({message:e instanceof Error?e.message:"Upload failed"},{status:500});}
}
