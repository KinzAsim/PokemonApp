import React, { useEffect } from 'react';
import { Text, StyleSheet, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  selectPokemon,
  setPokemonDetails,
} from '../../redux/reducers/pokemonSlice';
import {
  useGetPokemonListQuery,
  useGetPokemonByIdQuery,
} from '../../services/pokemonApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokiList from './components/PokiList';
import SelectedItem from './components/SelectedItem';

export default function Home() {
  const dispatch = useDispatch();
  const { selected } = useSelector((state: RootState) => state.pokemon);

  const {
    data: listData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetPokemonListQuery({ limit: 8 });

  const { data: detailData, isLoading: detailLoading } = useGetPokemonByIdQuery(
    selected?.name ?? '',
    {
      skip: !selected,
    },
  );

  useEffect(() => {
    if (detailData) {
      dispatch(setPokemonDetails(detailData));
    }
  }, [detailData]);

  useEffect(() => {
    const backAction = () => {
      if (selected) {
        dispatch(selectPokemon(null));
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selected]);

  if (isLoading && !listData) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1976d2' }}>
      {!selected ? (
        <PokiList
          listData={listData}
          isFetching={isFetching}
          refetch={refetch}
        />
      ) : (
        <SelectedItem selected={selected} detailLoading={detailLoading} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
