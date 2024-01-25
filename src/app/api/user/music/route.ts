import TopItemListType from "@/types/music/TopItemListType";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

function removeDuplicatesByPropertyName(res: TopItemListType[]) {
  const uniqueObjects: { [x: string]: boolean } = {};
  const resultArray: TopItemListType[] = [];

  res.forEach((item: TopItemListType) => {
    const propertyValue = item.album.albumId;
    if (!uniqueObjects[propertyValue]) {
      uniqueObjects[propertyValue] = true;
      resultArray.push(item);
    }
  });

  return resultArray;
}

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
      track: {
        name: item.name,
      },
      album: {
        albumId: item.album.id,
        imageUrl: item.album.images[0].url,
        name: item.album.name,
      },
      artists: item.artists.map((item) => item.name),
    }));

    const newArray = removeDuplicatesByPropertyName(res);
    console.log(newArray);

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
    return NextResponse.json(newArray);
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { error: err.response?.statusText },
        { status: err.response?.status },
      );
    }
  }
}
