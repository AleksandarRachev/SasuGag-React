import app from '../utils/axiosConfig';

const baseUrl = "http://localhost:9090";

function getPosts(page) {
    const requestOptions = {
        method:"GET",
        headers: {}
    }

    return app.request(`${baseUrl}/posts?page=${page}`, requestOptions);
}

export const getPostsService = {
    getPosts
};