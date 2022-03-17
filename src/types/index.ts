// type for characters
export type CharacterProps = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
};

// type for characters series
export type SeriesProp = {
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
};

// type for characters comics
export type ComicsProp = {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  series: {
    name: string;
  };
  creators: {items: CreatorComicsProp[]};
  thumbnail: {
    extension: string;
    path: string;
  };
};

export type CreatorComicsProp = {
  name: string;
  role: string;
  resourceURI: string;
}