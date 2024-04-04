import { NextRequest, NextResponse } from "next/server";
import { Configuration, InfoApi } from "palworld-openapi";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const config = new Configuration({
    fetchApi: (x, y) => fetch(x, { ...y, next: { revalidate: 5 } }),
    basePath: "http://192.168.11.20:8212",
    username: "admin",
    password: "1",
  });

  const api = new InfoApi(config);
  const response = await api.getPlayers();

  return NextResponse.json(response.players);
}
