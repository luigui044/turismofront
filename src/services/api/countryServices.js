import httpClient from '../httpClient';


export const countryServices = {
    async getAllCountries() {
        const params = {
            populate: {
                img_miniatura: true
            }
        };
        const response = await httpClient.get('/t-paises', { params });
        return response.data;
    },
    async getCountryById(id) {
        const response = await httpClient.get(`/t-paises/${id}`);
        return response.data;
    }
};
