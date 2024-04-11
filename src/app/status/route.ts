import { NextRequest, NextResponse } from "next/server";
import { Configuration, InfoApi } from "palworld-openapi";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const config = new Configuration({
      fetchApi: (x, y) => fetch(x, { ...y, next: { revalidate: 1 } }),
      basePath: process.env.BASE_PATH,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    const api = new InfoApi(config);
    const response = await api.getPlayers();
    return NextResponse.json(response.players);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
