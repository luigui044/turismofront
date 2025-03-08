import httpClient from '../httpClient';


export const countryServices = {
    async getAllCountries() {
        const response = await httpClient.get('/t-paises');
        return response.data;
    },
    async getCountryById(id) {
        const response = await httpClient.get(`/t-paises/${id}`);
        return response.data;
    }
};
