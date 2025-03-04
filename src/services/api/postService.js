import httpClient from '../httpClient';

export const postService = {
    async getPostByCategory(categoryId, limit) {
        try {
            const params = new URLSearchParams();

            if (categoryId) {
                params.append('filters[categories][$eq]', categoryId);
            }

            if (limit) {
                params.append('pagination[limit]', limit);
            }

            // Manejo correcto de populate con JSON
            params.append('populate', 'user_published,post_coments,imagen_miniatura');

            const query = `/posts?${params.toString()}`;
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
            const params = new URLSearchParams();

            if (slug) {
                params.append('filters[slug][$eq]', slug);
            }

            params.append('populate', 'multimedia');

            const query = `/posts?${params.toString()}`;
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
