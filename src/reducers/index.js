import { combineReducers } from 'redux';
import ViewerReducer from './ViewerReducer';
import SettingsReducer from './SettingsReducer';


const reducers = combineReducers({
    view: ViewerReducer,
    settings: SettingsReducer
});

export default reducers;
