import app from '../utils/axiosConfig';

const baseUrl = "http://localhost:9090";

function getPosts(page) {
    const requestOptions = {
        method:"GET",
        headers: {},
        data: {}
    }

    return app.request(`${baseUrl}/posts?page=1`, requestOptions);
}

export const getPostsService = {
    getPosts
};