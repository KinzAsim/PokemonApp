import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectPokemon } from '../../../redux/reducers/pokemonSlice';

const PokiList = ({ listData, isFetching, refetch }: any) => {
  console.log('🚀 ~ PokiList ~ listData:', listData);
  const dispatch = useDispatch();
  return (
    <View style={styles.listContainer}>
      <Text style={styles.header}>PokeReact</Text>
      <FlatList
        data={listData?.results}
        keyExtractor={item => item.name}
        renderItem={({ item, index }) => {
          const pokemonId = item.url
            ? item.url.split('/').filter(Boolean).pop()
            : index + 1;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => dispatch(selectPokemon(item))}
            >
              <Image source={{ uri: imageUrl }} style={styles.icon} />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </View>
  );
};

export default PokiList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  header: {
    backgroundColor: '#1976d2',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
