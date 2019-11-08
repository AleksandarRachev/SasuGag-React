import {getPostsService} from '../services/getPosts.service';
import {getPostsConstants} from '../constants/getPosts.constants';

export const getPostsActions = {
    getPosts
};

function getPosts (page) {
    return dispatch => {
        dispatch(request());
        return getPostsService.getPosts(page).then(response => {
            return dispatch (
                getPostsSuccess({posts: response}),
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