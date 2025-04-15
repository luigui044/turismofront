import httpClient from '../httpClient';

export const menuService = {
    async getMenu(menuId) {
        try {
            const params = new URLSearchParams();
            params.append('populate', 't_menus, t_menu_subitems');
            params.append('filters[t_menus][id]', menuId);
            params.append('sort', 'orden:asc');
            const query = `/t-menu-items?${params.toString()}`;
            const response = await httpClient.get(query);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el menú:', error);
            throw error;
        }
    }
}