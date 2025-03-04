import httpClient from '../httpClient';

export const offertsService = {
    async getOfferts(categoryId, limit) {
        try {
            const params = new URLSearchParams();

            // Strapi permite un solo `populate` con valores separados por comas
            params.append('populate', 'imagenes,empresa,empresa.categoria_turismo');

            if (categoryId) {
                params.append('filters[categoria_oferta][$eq]', categoryId);
            }

            if (limit) {
                params.append('pagination[limit]', limit);
            }

            const query = `/ofertas?${params.toString()}`;
            const response = await httpClient.get(query);

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Error fetching offerts:', error);
            return {
                success: false,
                message: error.message || 'An error occurred',
                error,
            };
        }
    }
};
