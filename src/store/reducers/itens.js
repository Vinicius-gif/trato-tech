import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import itensService from 'services/itens';

export const carregarItens = createAction('itens/carregarItens');

export const buscarItens = createAsyncThunk(
  'itens/buscar',
  itensService.buscar
);

const itensSlice = createSlice({
  name: 'itens',
  initialState: [],
  reducers: {
    adicionarTodosOsItens: (state, {payload}) => {
      console.log(payload);
      return payload
    },
    mudarFavorito: (state, { payload }) => {
      state = state.map(item => {
        if(item.id === payload) item.favorito = !item.favorito;
        return item;
      })
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() })
    },
    mudarItem: (state, {payload}) => {
      const index = state.findIndex(item => item.id === payload.id);
      Object.assign(state[index], payload.item);
    ;},
    deletarItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload);
      state.splice(index, 1);
    }
  }
});

export const { adicionarTodasOsItens, mudarFavorito, cadastrarItem, mudarItem, deletarItem} = itensSlice.actions;

export default itensSlice.reducer;