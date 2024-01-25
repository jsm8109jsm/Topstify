"use client";

import useTopItem from "@/api/user/useTopItem";
import Image from "next/image";
import TopItemListType from "@/types/music/TopItemListType";
import Header from "@/components/Header/Header";

export default function Home() {
  const { topItemList, getTopItemQueryIsSuccess } = useTopItem();
  return (
    <div>
      <Header />
      {getTopItemQueryIsSuccess &&
        topItemList.map((item: TopItemListType) => (
          <>
            {item.album.name}
            <Image
              src={item.album.imageUrl}
              alt={item.album.name}
              width={50}
              height={50}
            />
          </>
        ))}
    </div>
  );
}
