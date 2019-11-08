import app from '../utils/axiosConfig';
import GlobalVariables from '../globalVariables'

const baseUrl = GlobalVariables.backendUrl;

function getPosts(page) {
    const requestOptions = {
        method:"GET",
        headers: {}
    }

    return app.request(`${baseUrl}/posts?page=${page}`, requestOptions);
}

function getCategories() {
    const requestOptions = {
        method:"GET",
        headers: {}
    }

    return app.request(`${baseUrl}/categories`, requestOptions);
}

export const getPostsService = {
    getPosts,
    getCategories
};