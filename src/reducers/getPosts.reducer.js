import { getPostsConstants } from '../constants/getPosts.constants';

export function getPosts(state = {
    isLoading: false,
    error: null,
    posts: null,
    categories: []
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
                    posts: action.data.posts
                };
                

        case getPostsConstants.GET_POSTS_REQUEST_FAILURE:
                return {
                    ...state,
                    error: action.error,
                    isLoading: false,
                    posts: null
                };

        case getPostsConstants.CLEAR_GET_POSTS_STATE:
                return {
                    ...state,
                    posts: null,
                    error: null
                };

    //Categories
        case getPostsConstants.GET_CATEGORIES_REQUEST:
                return {
                    ...state,
                    error: null,
                    isLoading: true
                };
            
        case getPostsConstants.GET_CATEGORIES_REQUEST_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isLoading: false,
                    categories: action.data.categories
                };
                

        case getPostsConstants.GET_CATEGORIES_REQUEST_FAILURE:
                return {
                    ...state,
                    error: action.error,
                    isLoading: false,
                    categories: []
                };

        case getPostsConstants.CLEAR_GET_CATEGORIES_STATE:
                return {
                    ...state,
                    categories: null,
                    error: null
                };
                default : return state;

    }
}