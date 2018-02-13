import { combineReducers } from 'redux';
import {fieldReducer} from "./fieldReducer";

export default combineReducers({
    field: fieldReducer
});