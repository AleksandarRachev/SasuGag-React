import { combineReducers } from 'redux';
import { login } from './login.reducer';
import { getPosts } from './getPosts.reducer';

const rootReducer = combineReducers ({
    login,
    getPosts
});

export default rootReducer;