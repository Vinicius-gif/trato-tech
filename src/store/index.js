import { configureStore } from '@reduxjs/toolkit';
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import carrinhoSlice from './reducers/carrinho';
import buscaSlice from './reducers/busca';
import { categoriasListener } from './middlewares/categorias';
import { itensListner } from './middlewares/itens';
import { categoriasSaga } from './sagas/categorias';
import createSagaMiddleware from '@redux-saga/core';
import { carrinhoSaga } from './sagas/carrinho';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice
  },
  middleware: 
    getDefaultMiddleware => 
      getDefaultMiddleware().prepend(
        categoriasListener.middleware,
        itensListner.middleware,
        sagaMiddleware
      ),
});

sagaMiddleware.run(categoriasSaga);
sagaMiddleware.run(carrinhoSaga);

export default store;