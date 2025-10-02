import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonList: builder.query<any, { limit?: number; offset?: number }>({
      query: ({ limit = 20, offset = 0 }) =>
        `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getPokemonById: builder.query<any, string | number>({
      query: id => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
