import httpClient from '../httpClient'


const getCompany = async () => {
    const response = await httpClient.get('/empresas');

    return response.data;
};

const createCompany = async (company) => {
    const response = await httpClient.post('/empresas', company);
    return response;
};

const updateCompany = async (company) => {
    const response = await httpClient.put(`/empresas/${company.id}`, company);
    return response.data;
};

const deleteCompany = async (id) => {
    const response = await httpClient.delete(`/empresas/${id}`);
    return response.data;
};

export default {
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
};

