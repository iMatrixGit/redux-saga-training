const initialState = {
    userId: null,
    id: null,
    title: null,
    body: null,
    nextPostId: 0,
    isLoading: false,
    isRunning: false,
    seconds: 0,
    images: [],
    selectedImage: 0,
    password: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'FETCH_SUCCEEDED':
            return {
                ...state,
                userId: action.payload.userId,
                id: action.payload.id,
                title: action.payload.title,
                body: action.payload.body
            };
        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false
            };
        case 'START_TIMER':
            return {
                ...state,
                isRunning: true
            };
        case 'STOP_TIMER':
            return {
                ...state,
                isRunning: false
            };
        case 'TICK':
            return {
                ...state,
                seconds: state.seconds + 1
            };
        case 'RESET_TIMER':
            return {
                ...state,
                seconds: 0,
                isRunning: false
            };
        case 'CHANGE_SELECTED_IMAGE':
            debugger;
            return {
                ...state,
                selectedImage: action.payload.index
            };
        case 'IMAGES_LOADED':
            return {
                ...state,
                images: action.payload.images
            };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        case 'LOGIN':
            return state;
        default:
            return state
    }
}
