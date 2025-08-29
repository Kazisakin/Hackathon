import { NextRequest, NextResponse } from "next/server";
    {/*AI GENEREATED*/}
export async function POST(req: NextRequest) {
  const { fileUrl } = await req.json();
  const upstreamRes = await fetch(
    "https://testing.asets.io/convert/v1/isometric:process",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer idsv-dashboard-demo-2025",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file: fileUrl
      })
    }
  );
  const data = await upstreamRes.json();
  return NextResponse.json(data, { status: upstreamRes.status });
}