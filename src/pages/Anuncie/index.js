import Button from 'components/Button';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Anuncie.module.scss';
import { useForm } from 'react-hook-form';
import { cadastrarItem } from 'store/reducers/itens';
import { useParams } from 'react-router-dom';
import Input from 'components/Input';

export default function Anuncie() {
  const dispatch = useDispatch();
  const { nomeCategoria = '' } = useParams();
  const categorias = useSelector(state => state.categorias.map(({ nome, id }) => ({ nome, id })));
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: nomeCategoria
    }
  });
  const { errors } = formState;

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
  }

  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto no melhor site do Brasil!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input
          className={errors.titulo ? styles['input-erro'] : ''} 
          {...register('titulo', {required: 'O campo nome é obrigatório'})} 
          placeholder='Nome do produto' alt='nome do produto' 
        />
        {errors.nome && <span className={styles['mensagem-erro']}> {errors.nome.message} </span>}
        <Input 
          className={errors.descricao ? styles['input-erro'] : ''}
          {...register('descricao', {required: 'O campo descricao é obrigatório'})} 
          placeholder='Descrição do produto' 
          alt='descrição do produto' 
        />
        {errors.descricao && <span className={styles['mensagem-erro']}> {errors.descricao.message} </span>}
        <Input 
          className={errors.foto ? styles['input-erro'] : ''}
          {...register('foto', {required: 'O campo imagem é obrigatório'})} 
          placeholder='URL da imagem do produto' 
          alt='URL da imagem do produto' 
        />
        {errors.imagem && <span className={styles['mensagem-erro']}> {errors.imagem.message} </span>}
        <select 
          className={errors.categoria ? styles['input-erro'] : ''} 
          {...register('categoria', {required: 'O campo categoria é obrigatório'})}
          disabled={nomeCategoria}
        >
          <option value='' disabled > Selecione a categoria </option>
            {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && <span className={styles['mensagem-erro']}> {errors.categoria.message} </span>}
        <Input 
          className={errors.preco ? styles['input-erro'] : ''} 
          {...register('preco', {required: 'O campo preco é obrigatório', valueAsNumber: true})} 
          type='number' 
          placeholder='Preço do produto' 
        />
        {errors.preco && <span className={styles['mensagem-erro']}> {errors.preco.message} </span>}
        <Button type='submit'>
          Cadastrar produto
        </Button>
      </form>
    </div>
  )
}