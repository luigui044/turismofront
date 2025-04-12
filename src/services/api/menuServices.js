import httpClient from '../httpClient';

export const menuService = {
    async getMenu() {
        try {
            const params = new URLSearchParams();
            params.append('populate', 't_menu_items');
            const query = `/t-menus?${params.toString()}`;
            const response = await httpClient.get(query);

            return response.data;
        } catch (error) {
            console.error('Error al obtener el menú:', error);
            throw error;
        }
    }
}