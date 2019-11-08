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

function getPostsFiltered(category, page) {
    const requestOptions = {
        method:"GET",
        headers: {}
    }

    return app.request(`${baseUrl}/posts/filter?category=${category}&page=${page}`, requestOptions);
}

function getCategories() {
    const requestOptions = {
        method:"GET",
        headers: {}
    }

    return app.request(`${baseUrl}/categories`, requestOptions);
}

function getCount() {
    const requestOptions = {
        method:"GET",
        headers: {}
    }
    return app.request(`${baseUrl}/posts/count`, requestOptions);
}

function getCountFiltered(category) {
    const requestOptions = {
        method:"GET",
        headers: {}
    }
    return app.request(`${baseUrl}/posts/count/filter?category=${category}`, requestOptions);
}

export const getPostsService = {
    getPosts,
    getPostsFiltered,
    getCount,
    getCountFiltered,
    getCategories
};