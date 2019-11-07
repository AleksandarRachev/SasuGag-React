import { loginConstants } from '../constants/login.constants';

export function login(state = {
    isLoading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    authToken:null
}, action) {
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        
        case loginConstants.LOGIN_REQUEST_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isLoading: false,
                    user: action.data.userResponse,
                    isAuthenticated: true,
                    authToken: action.data.token
                };

        case loginConstants.LOGIN_REQUEST_FAILURE:
                return {
                    ...state,
                    error: action.error,
                    isLoading: false,
                    user: null,
                    isAuthenticated: false,
                    authToken: null
                };

        case loginConstants.CLEAR_LOGIN_STATE:
                return {
                    ...state,
                    user: null,
                    isAuthenticated: false,
                    authToken: null
                };
                default : return state;

    }
}