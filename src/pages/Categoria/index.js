import Button from 'components/Button';
import Header from 'components/Header';
import Item from 'components/Item';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarItens } from 'store/reducers/itens';
import styles from './Categoria.module.scss';

export default function Categoria() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nomeCategoria } = useParams();
  const { categoria, itens } = useSelector(state => {
    const ragexp = new RegExp(state.busca, 'i');
    return {
      categoria: state.categorias.find(categoria => categoria.id 
      === nomeCategoria) || {},
      itens: state.itens.filter(item => item.categoria === nomeCategoria && item.titulo.match(ragexp))
    }
  });

  useEffect(() => {
    dispatch( buscarItens());
  }, [dispatch]);

  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>Anuncie para essa categoria</Button>
      </Header>
      <div className={styles.itens}>
        {itens?.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}