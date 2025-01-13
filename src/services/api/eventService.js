import httpClient from '../httpClient';

export const eventService = {
    async getEvents(categoryId, limit) {
        try {
            let query = `/eventos?`;
            query += 'populate=imagenes&populate=empresa';

            if (categoryId) {
                query += `&filters[categoria_oferta][$eq]=${categoryId}`;

            }


            const response = await httpClient.get(query);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Error fetching posts:', error);
            return {
                success: false,
                message: error.message || 'An error occurred',
                error,
            };
        }
    },


};
