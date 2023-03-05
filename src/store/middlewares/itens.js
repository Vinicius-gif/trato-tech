import { createListenerMiddleware } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { carregarUmaCategoria } from "store/reducers/categorias";
import { adicionarItens } from "store/reducers/itens";
import criarTarefa from "./utils/criarTarefa";

export const itensListner = createListenerMiddleware(); // crie o middleware

itensListner.startListening({ // utilize o startListening
  actionCreator: carregarUmaCategoria, // escute a action
  effect: async (action, { dispatch, fork, unsubscribe, getState }) => {
    const { itens } = getState();

    if (itens.length === 25) return unsubscribe();

    const nomeCategoria = action.payload;

    const itensCarregados = itens.some(item => item.categoria === nomeCategoria);

    if (itensCarregados) return;
    
    await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      busca: () => itensService.buscarDeCategorias(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso!`,
      textoErro: 'Erro na busca de itens',
    });
    
  }
});