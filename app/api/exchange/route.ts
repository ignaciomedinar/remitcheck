import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://v6.exchangerate-api.com/v6";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const base = searchParams.get("base");
  const target = searchParams.get("target");

  if (!base || !target) {
    return NextResponse.json(
      { error: "Se requieren los parámetros 'base' y 'target'" },
      { status: 400 }
    );
  }

  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key no configurada" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `${BASE_URL}/${apiKey}/pair/${base}/${target}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Error al consultar la API de tasas de cambio" },
      { status: 502 }
    );
  }

  const data = await res.json();

  if (data.result !== "success") {
    return NextResponse.json(
      { error: data["error-type"] ?? "Respuesta inválida" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    base: data.base_code,
    target: data.target_code,
    rate: data.conversion_rate,
  });
}
