import api from './api';

export const getImoveis = async () => {
  try {
    const response = await api.post('/filtrar/imoveis', {});
    return response.data;
  } catch (error) {
    console.error('Erro ao pegar imóveis:', error);
    return [];
  }
};

export const filterImoveis = async (filtro) => {
  try {
    const response = await api.post('/filtrar/imoveis', filtro);
    return response.data;
  } catch (error) {
    console.error('Erro ao filtrar imóveis:', error);
    return [];
  }
}


export const createImovel = async (imovel) => {
  try {
    const response = await api.post('/criar/imoveis', imovel);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar imóvel:', error);
    throw error;
  }
};

export const deleteImovel = async (id) => {
    try {
        const response = await api.delete(`/imoveis/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
        throw error;
    }
}
