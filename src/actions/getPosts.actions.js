import {getPostsService} from '../services/getPosts.service';
import {getPostsConstants} from '../constants/getPosts.constants';
// import {persistState} from '../utils/localStorage';

export const getPostsActions = {
    posts
}

function posts (page) {
    return dispatch => {
        dispatch(request());
        return getPostsService.getPosts(page).then(response => {
            // persistState("LOGIN", {token: response.token, user: response.userResponse});
            return dispatch (
                getPostsSuccess({posts: response.data}),
                // window.location.href="/home"
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