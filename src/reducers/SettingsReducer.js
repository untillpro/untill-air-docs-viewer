import { Cookies } from 'react-cookie';
import {
    SET_TOGGLE_OPENED,
    SET_PROP
} from 'actions/types';

const INITIAL_STATE = {
    opened: false,
    theme: 'dark'
};

var cookies = new Cookies();
var theme = cookies.get('theme');

if(theme && theme != '' && (theme === 'light' || theme === 'dark')) {
    INITIAL_STATE.theme = theme;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TOGGLE_OPENED: 
            return {
                ...state,
                opened: !state.opened
            };
        case SET_PROP: {
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        }
        default: 
            return state;
    }
};
