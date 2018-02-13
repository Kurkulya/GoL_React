const API_CALL_REQUEST = "API_CALL_REQUEST";

const initialState = {
    fieldMatrix: []
};

export function fieldReducer(state = initialState, action) {
    switch (action.type) {
        case API_CALL_REQUEST:
            return { ...state, fieldMatrix: action };
        default:
            return state;
    }
}