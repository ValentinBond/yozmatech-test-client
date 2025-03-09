import {
  TFavoriteSongInput,
  TFavoriteSongOutput,
  TSongsInput,
  TSongsOutput,
} from '../types/songs.ts';
import apiClient from '../api/apiClient.tsx';

export const getSongs = async (params: TSongsInput) => {
  const resp = await apiClient.get<TSongsOutput>('/songs/search', {
    params,
  });

  return resp.data;
};

export const addToFavorite = async (data: TFavoriteSongInput) => {
  const resp = await apiClient.post<TFavoriteSongOutput>(
    '/songs/favorites',
    data
  );

  return resp.data;
};
