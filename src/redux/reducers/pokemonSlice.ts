import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  selected: any | null;
}

const initialState: PokemonState = {
  selected: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<any | null>) => {
      state.selected = action.payload;
    },
    setPokemonDetails: (state, action: PayloadAction<any>) => {
      if (state.selected) {
        state.selected = {
          ...state.selected,
          details: action.payload,
        };
      }
    },
  },
});

export const { selectPokemon, setPokemonDetails } = pokemonSlice.actions;
export default pokemonSlice.reducer;
