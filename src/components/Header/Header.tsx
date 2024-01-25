import React from "react";
import Image from "next/image";
// import localFont from "next/font/local";
import Link from "next/link";

// const customFont = localFont({
//   src: [
//     {
//       path: "../../../public/fonts/Gotham-Light.otf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../../../public/fonts/Gotham-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   display: "swap",
// });

function Header() {
  return (
    <header className="h-16 w-full dark:bg-black px-10 flex justify-between items-center">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Topstify 로고"
          width={107}
          height={33}
        />
      </Link>
      <button
        className="py-1.5 px-5 rounded-full dark:bg-white dark:text-black text-xl"
        type="button"
      >
        <a
          href={`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL}&scope=user-read-private%20user-read-email%20ugc-image-upload%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played%20user-top-read%20user-library-modify%20user-library-read`}
        >
          로그인
        </a>
      </button>
    </header>
  );
}

export default Header;
