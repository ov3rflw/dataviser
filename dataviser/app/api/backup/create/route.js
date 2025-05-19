import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const h = parseInt(url.searchParams.get("h") || "0", 10);
    const m = parseInt(url.searchParams.get("m") || "0", 10);

    if (isNaN(h) || isNaN(m) || (h === 0 && m === 0)) {
      return NextResponse.json({ error: "Durée invalide" }, { status: 400 });
    }

    const delaySeconds = (h * 60 + m) * 60;

    const response = await fetch("http://localhost:8080/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delay: delaySeconds }),
    });

    if (!response.ok) {
      throw new Error("Erreur avec le conteneur de backup");
    }

    return NextResponse.json({ message: `Backup programmée dans ${h}h${m}m` });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
