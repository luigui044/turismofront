import httpClient from '../httpClient';

export const eventService = {
    async getEvents(categoryId, limit) {
        try {
            const params = new URLSearchParams();

            // `populate` en una sola línea para múltiples relaciones
            params.append('populate', 'imagenes,empresa,empresa.categoria_turismo');

            if (categoryId) {
                params.append('filters[categoria_evento][$eq]', categoryId); // Asegúrate de que la clave es correcta
            }

            if (limit) {
                params.append('pagination[limit]', limit);
            }

            const query = `/eventos?${params.toString()}`;
            const response = await httpClient.get(query);

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Error fetching events:', error);
            return {
                success: false,
                message: error.message || 'An error occurred',
                error,
            };
        }
    }
};
