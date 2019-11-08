import {getPostsService} from '../services/getPosts.service';
import {getPostsConstants} from '../constants/getPosts.constants';

export const getPostsActions = {
    getPosts,
    getPostsFiltered,
    getCount,
    getCountFiltered,
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

function getCount () {
    return dispatch => {
        dispatch(request());
        return getPostsService.getCount().then(count => {
            return dispatch (
                getCountSuccess({count}),
            );
        }, error => dispatch(getCountFailure(error.response.data.message))
        );
    };

    function request () {
        return {type: getPostsConstants.GET_COUNT_REQUEST}
    }

    function getCountFailure(error) {
        return {type: getPostsConstants.GET_COUNT_FAILURE, error}
    }
    
    function getCountSuccess(data) {
        return {type: getPostsConstants.GET_COUNT_SUCCESS, data}
    }
}

function getCountFiltered (category) {
    return dispatch => {
        dispatch(request());
        return getPostsService.getCountFiltered(category).then(count => {
            return dispatch (
                getCountFilteredSuccess({count}),
            );
        }, error => dispatch(getCountFilteredFailure(error.response.data.message))
        );
    };

    function request () {
        return {type: getPostsConstants.GET_POSTS_REQUEST}
    }

    function getCountFilteredFailure(error) {
        return {type: getPostsConstants.GET_COUNT_FILTERED_FAILURE, error}
    }
    
    function getCountFilteredSuccess(data) {
        return {type: getPostsConstants.GET_COUNT_FILTERED_SUCCESS, data}
    }
}


function getPostsFiltered (category, page) {
    return dispatch => {
        dispatch(request());
        return getPostsService.getPostsFiltered(category, page).then(posts => {
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
        return {type: getPostsConstants.GET_POSTS_FILTERED_REQUEST_FAILURE, error}
    }
    
    function getPostsSuccess(data) {
        return {type: getPostsConstants.GET_POSTS_FILTERED_REQUEST_SUCCESS, data}
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