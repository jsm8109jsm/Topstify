import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const body = await request.json();
    const requestHeaders = new Headers(request.headers);
    // console.log("headers", requestHeaders.get("authorization"));
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: requestHeaders.get("authorization"),
          "Accept-Language": "ko-KR",
        },
        params: {
          limit: 50,
        },
      },
    );

    const res = response?.data.items.map((item) => ({
      name: item.name,
      artists: item.artists.map((item) => item.name),
      imageUrl: item.album.images[0].url,
    }));
    console.log(res);

    // const spotifyApi = new SpotifyWebApi({
    //   redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL,
    //   clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    // });

    // const data = await spotifyApi.authorizationCodeGrant(code);
    // const responseData = {
    //   accessToken: data.body.access_token,
    //   refreshToken: data.body.refresh_token,
    //   expiresIn: data.body.expires_in,
    // };

    // console.log("response", responseData);
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
