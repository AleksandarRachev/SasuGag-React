import {loginService} from '../services/login.services';
import {loginConstants} from '../constants/login.constants';
import {persistState} from '../utils/localStorage'

export const loginActions = {
    userLogin
}

function userLogin (email, password) {
    return dispatch => {
        dispatch(request());
        return loginService.login(email, password).then(response => {
            persistState("LOGIN", {token: response.token, user: response.userResponse});
            return dispatch (
                userLoginSuccess({token: response.token, user: response.userResponse}),
                window.location.href="/home"
            );
        }, error => dispatch(userLoginFailure(error.response.data.message))
        );
    };

    function request () {
        return {type: loginConstants.LOGIN_REQUEST}
    }

    function userLoginFailure(error) {
        return {type: loginConstants.LOGIN_REQUEST_FAILURE, error}
    }
    
    function userLoginSuccess(data) {
        return {type: loginConstants.LOGIN_REQUEST_SUCCESS, data}
    }

}