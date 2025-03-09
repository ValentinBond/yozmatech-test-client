import { DataTable } from '../ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { TOrderBy, TSongItem, TSongsSortBy } from '../../types/songs.ts';
import {
  useAddFavoriteSongMutation,
  useGetProvidersQuery,
} from '../../queries/songs.tsx';
import { useState } from 'react';
import { removeEmptyKeys } from '../../utils/common.ts';
import { useDebounceValue } from '../../hooks/useDebounceValue.tsx';
import styles from './Main.module.css';
import { Button } from '../../components/ui';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { GET_SONGS_KEY } from '../../queries/keys.ts';
import { Checkbox } from '../../components/ui/Checkbox';

const columns: ColumnDef<TSongItem>[] = [
  {
    header: 'Artist',
    accessorKey: 'artist',
  },
  {
    header: 'Album',
    accessorKey: 'album',
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
];

export const Main = () => {
  const queryClient = useQueryClient();
  const [order, setOrder] = useState<TOrderBy>('desc');
  const [sortBy, setSortBy] = useState<TSongsSortBy>('title');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [query, setQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const debouncedQuery = useDebounceValue(query, 400);

  const { mutate: addFavorite } = useAddFavoriteSongMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SONGS_KEY] });
        toast('The song has been added to favorites!');
      },
    },
  });

  const { data: songs, isPending: isSongsLoading } = useGetProvidersQuery(
    removeEmptyKeys({
      order,
      sortBy,
      limit: pageSize,
      page,
      query: debouncedQuery,
      onlyFavorites,
    })
  );

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Songs</h1>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            onCheckedChange={() => {
              setOnlyFavorites((prev) => !prev);
            }}
            checked={onlyFavorites}
          />
          <label htmlFor="terms">Only Favorites</label>
        </div>
      </div>
      <DataTable
        data={(songs?.data || []) as TSongItem[]}
        columns={columns}
        setFilter={(v) => setQuery(v)}
        setOrder={(v) => setOrder(v as TOrderBy)}
        setSortBy={(v) => setSortBy(v as TSongsSortBy)}
        setPageSize={(v) => setPageSize(v)}
        setPage={(v) => setPage(v)}
        pageSize={pageSize}
        page={page}
        filter={query}
        pageCount={songs?.totalPages || 0}
        isLoading={isSongsLoading}
        actions={(row) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                addFavorite({ songId: row._id });
              }}
              disabled={row.isFavorite}
            >
              Like
            </Button>
          </div>
        )}
      />
    </section>
  );
};
