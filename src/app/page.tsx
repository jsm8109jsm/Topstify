"use client";

import useTopItem from "@/api/user/useTopItem";
import { useEffect } from "react";

export default function Home() {
  const { topItemList } = useTopItem();
  return (
    <div>
      <a
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL}&scope=user-read-private%20user-read-email%20ugc-image-upload%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played%20user-top-read%20user-library-modify%20user-library-read`}
      >
        스포티파이 로그인
      </a>
    </div>
  );
}
