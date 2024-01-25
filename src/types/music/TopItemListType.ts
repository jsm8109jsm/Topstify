type TopItemListType = {
  track: { name: string };
  album: {
    albumId: string;
    imageUrl: string;
    name: string;
  };
  artists: string[];
};

export default TopItemListType;
