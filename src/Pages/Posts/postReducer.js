export let init = {
    postData: {
        title: '',
        body: '',
    },
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {...state, postData: action.payload}
            break;
        case 'setInputValue':
            return {...state, postData:{
                ...state.postData,
                [action.propName]: action.propValue,
            }}
            break;
        default:
            return state;
    }
};