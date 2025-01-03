import httpClient from '../httpClient';

export const postService = {
    async getPostByCategory(categoryId, limit) {
        try {
            let query = `/posts?`;

            if (categoryId) {
                query += `filters[categories][$eq]=${categoryId}`;
            }

            query += '&populate=user_published&populate=post_coments&populate=imagen_miniatura';

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

    async getPostBySlug(slug) {

        try {
            let query = `/posts?`;

            if (slug) {
                query += `filters[slug][$eq]=${slug}`;
            }

            query += '&populate=multimedia';

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
    }
};
