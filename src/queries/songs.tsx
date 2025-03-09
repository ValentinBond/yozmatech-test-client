import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  TFavoriteSongInput,
  TFavoriteSongOutput,
  TSongsInput,
  TSongsOutput,
} from '../types/songs.ts';
import { GET_SONGS_KEY } from '../queries/keys';

import { addToFavorite, getSongs } from '../api/songs';

export const useGetProvidersQuery = (
  paramsPoApi: TSongsInput = {},
  options: Partial<UseQueryOptions<TSongsOutput, Error, TSongsOutput>> = {}
) =>
  useQuery({
    queryKey: [GET_SONGS_KEY, paramsPoApi],
    queryFn: () => getSongs(paramsPoApi),
    ...options,
  });

export const useAddFavoriteSongMutation = ({
  options = {},
}: {
  options?: UseMutationOptions<TFavoriteSongOutput, Error, TFavoriteSongInput>;
} = {}) => {
  return useMutation<TFavoriteSongOutput, Error, TFavoriteSongInput>({
    mutationFn: (data) => addToFavorite(data),
    ...options,
  });
};
