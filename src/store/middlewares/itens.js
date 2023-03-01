import { createStandaloneToast } from "@chakra-ui/toast";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { adicionarTodosOsItens, carregarItens } from "store/reducers/itens";

export const listener = createListenerMiddleware(); // crie o middleware

const {toast } = createStandaloneToast();

listener.startListening({ // utilize o startListening
  actionCreator: carregarItens, // escute a action
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    toast({
      title: 'Carregando',
      description: 'Carregando itens',
      status: 'loading',
      duration: 2000,
      isClosable: true
    })
    const tarefa = fork(async api => {
      await api.delay(1000);
      return await itensService.buscar();
    });

    const resposta = await tarefa.result;

    if (resposta.status === 'ok') {
      toast({
        title: 'Sucesso!',
        description: 'Itens carregados com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
      dispatch(adicionarTodosOsItens(resposta.value));
      unsubscribe();
    }

    if (resposta.status === 'rejected') {
      toast({
        title: 'Erro',
        description: 'Erro na busca de itens',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }
});