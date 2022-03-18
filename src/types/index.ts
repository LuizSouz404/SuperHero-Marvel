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
  description: string;
  startYear: number;
  endYear: number;
  creators: {items: CreatorComicsProp[], available: number};
  thumbnail: {
    extension: string;
    path: string;
  };
};

export type EventProp = {
  id: number;
  title: string;
  description: string;
  creators: {items: CreatorComicsProp[], available: number};
  thumbnail: {
    extension: string;
    path: string;
  };
}

// type for characters comics
export type ComicsProp = {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  series: {
    name: string;
  };
  creators: {items: CreatorComicsProp[], available: number};
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

// type for creators
export type CreatorsProp = {
  id: number;
  firstName: string;
  role: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  fullName: string;
}