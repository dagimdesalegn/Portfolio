import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getRepoFile, putRepoFile } from "@/lib/github-admin";

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const file = await getRepoFile("data/site-content.json");
    const content = JSON.parse(
      Buffer.from(file.content, "base64").toString("utf8")
    );

    return NextResponse.json(content);
  } catch {
    return NextResponse.json({
      about: {
        eyebrow: "About me",
        title: "",
        body: "",
      },
      experience: [],
      certificates: [],
    });
  }
}

export async function PUT(req: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await req.json();
    const current = await getRepoFile("data/site-content.json");

    await putRepoFile(
      "data/site-content.json",
      JSON.stringify(content, null, 2) + "\n",
      "admin: update portfolio content",
      current.sha
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Save failed",
      },
      { status: 500 }
    );
  }
}
