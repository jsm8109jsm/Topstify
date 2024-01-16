import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body);
    const { code } = body;

    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL,
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    });

    const data = await spotifyApi.authorizationCodeGrant(code);
    const responseData = {
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    };

    // console.log("response", responseData);
    return NextResponse.json(responseData);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
