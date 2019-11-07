import { getPostsConstants } from '../constants/getPosts.constants';

export function getPosts(state = {
    isLoading: false,
    error: null,
    posts: []
}, action) {
    switch (action.type) {
        case getPostsConstants.GET_POSTS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        
        case getPostsConstants.GET_POSTS_REQUEST_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isLoading: false,
                    posts: action.data
                };

        case getPostsConstants.GET_POSTS_REQUEST_FAILURE:
                return {
                    ...state,
                    error: action.error,
                    isLoading: false,
                    posts: []
                };

        case getPostsConstants.CLEAR_GET_POSTS_STATE:
                return {
                    ...state,
                    posts: null,
                    error: null
                };
                default : return state;

    }
}