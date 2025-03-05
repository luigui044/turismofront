import httpClient from '../httpClient';

const getAllCountries = async () => {
    const response = await httpClient.get('/t-paises');
    return response.data;
};

const getCountryById = async (id) => {
    const response = await httpClient.get(`/t-paises/${id}`);
    return response.data;
};


export default { getAllCountries, getCountryById };