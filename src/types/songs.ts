import { TGenericListResponse } from '../types/queries.ts';

export type TSongsSortBy = 'title' | 'artist' | 'album';

export type TOrderBy = 'asc' | 'desc';

export type TSongsInput = {
  query?: string;
  sortBy?: TSongsSortBy;
  order?: TOrderBy;
  page?: string;
  limit?: string;
  onlyFavorites?: boolean;
};

export type TSongItem = {
  title: string;
  artist: string;
  album: string;
  _id: string;
  isFavorite: boolean;
};

export type TSongsOutput = TGenericListResponse<TSongItem>;

export type TFavoriteSongInput = {
  songId: string;
};

export type TFavoriteSongOutput = {
  message: {
    songId: string;
    userId: string;
    _id: string;
  };
};
