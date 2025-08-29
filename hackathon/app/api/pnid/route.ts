import { NextRequest, NextResponse } from "next/server";
   {/*AI GENEREATED*/}
export async function POST(req: NextRequest) {
  try {
    const { fileUrl } = await req.json();
    if (!fileUrl) {
      return NextResponse.json({ error: "fileUrl is required" }, { status: 400 });
    }

    const upstreamRes = await fetch(
      "https://testing.asets.io/convert/v1/pnid:process",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer idsv-dashboard-demo-2025",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ file: fileUrl })
      }
    );

    const data = await upstreamRes.json();

    if (!upstreamRes.ok) {
   
      return NextResponse.json(
        { error: data?.error || "Upstream PNID processing error", details: data },
        { status: upstreamRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "API route error", message: error?.message || String(error) },
      { status: 500 }
    );
  }
}