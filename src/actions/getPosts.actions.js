import {getPostsService} from '../services/getPosts.service';
import {getPostsConstants} from '../constants/getPosts.constants';

export const getPostsActions = {
    getPosts,
    getCategories
};

function getPosts (page) {
    return dispatch => {
        dispatch(request());
        return getPostsService.getPosts(page).then(posts => {
            return dispatch (
                getPostsSuccess({posts}),
            );
        }, error => dispatch(getPostsFailure(error.response.data.message))
        );
    };

    function request () {
        return {type: getPostsConstants.GET_POSTS_REQUEST}
    }

    function getPostsFailure(error) {
        return {type: getPostsConstants.GET_POSTS_REQUEST_FAILURE, error}
    }
    
    function getPostsSuccess(data) {
        return {type: getPostsConstants.GET_POSTS_REQUEST_SUCCESS, data}
    }

}

function getCategories () {
    return dispatch => {
        dispatch(request());
        return getPostsService.getCategories().then(categories => {
            return dispatch (
                getCategoriesSuccess({categories}),
            );
        }, error => dispatch(getCategoriesFailure(error.response.data.message))
        );
    };

    function request () {
        return {type: getPostsConstants.GET_CATEGORIES_REQUEST}
    }

    function getCategoriesFailure(error) {
        return {type: getPostsConstants.GET_CATEGORIES_REQUEST_FAILURE, error}
    }
    
    function getCategoriesSuccess(data) {
        return {type: getPostsConstants.GET_CATEGORIES_REQUEST_SUCCESS, data}
    }

}