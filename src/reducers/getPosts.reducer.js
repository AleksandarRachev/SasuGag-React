import { getPostsConstants } from '../constants/getPosts.constants';

export function getPosts(state = {
    isLoading: false,
    error: null,
    posts: null,
    categories: [],
    category: null,
    count: null
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
                    category: null,
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

        //Posts filter

        case getPostsConstants.GET_POSTS_FILTERED_REQUEST_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isLoading: false,
                    category: action.data.posts.length > 0?action.data.posts[0].categoryName:null,
                    posts: action.data.posts
                };

        case getPostsConstants.GET_POSTS_FILTERED_REQUEST_FAILURE:
        return {
            ...state,
            error: action.error,
            isLoading: false,
            category: null,
            posts: null
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

        //count

        case getPostsConstants.GET_COUNT_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };

        case getPostsConstants.GET_COUNT_SUCCESS:
            return {
                ...state,
                count:action.data.count,
                isLoading: false,
                error: null
            };

        case getPostsConstants.GET_COUNT_SUCCESS:
            return {
                ...state,
                count:null,
                isLoading: false,
                error: action.error
            };

        //count filter

        case getPostsConstants.GET_COUNT_REQUEST:
                return {
                    ...state,
                    error: null,
                    isLoading: true
                };
    
            case getPostsConstants.GET_COUNT_FILTERED_SUCCESS:
                return {
                    ...state,
                    count:action.data.count,
                    isLoading: false,
                    error: null
                };
    
            case getPostsConstants.GET_COUNT_FILTERED_FAILURE:
                return {
                    ...state,
                    count:null,
                    isLoading: false,
                    error: action.error
                };
                default : return state;

    }
}