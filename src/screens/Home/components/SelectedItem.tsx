import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectPokemon } from '../../../redux/reducers/pokemonSlice';

const SelectedItem = ({ selected, detailLoading }: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.detailsHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => dispatch(selectPokemon(null))}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.detailsTitle}>{selected.name}</Text>
      </View>
      <ScrollView style={styles.detailsContainer}>
        {detailLoading ? (
          <Text>Loading details...</Text>
        ) : selected.details ? (
          <>
            <Image
              source={{ uri: selected.details.sprites.front_default }}
              style={styles.detailsImage}
            />
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{selected.details.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>{selected.details.height} cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{selected.details.weight} kg</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Types</Text>
              <View>
                {selected.details.types.map((t: any, idx: number) => (
                  <Text key={idx} style={styles.value}>
                    {t.type.name}
                  </Text>
                ))}
              </View>
            </View>
          </>
        ) : (
          <Text>No details found</Text>
        )}
      </ScrollView>
    </>
  );
};

export default SelectedItem;

const styles = StyleSheet.create({
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'capitalize',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: 10,
  },
  detailsImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
