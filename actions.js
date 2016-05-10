export function fetchPosts(url){
    return {
        type: 'FETCH_REQUEST',
        url
    }
}

export function cancelFetch(){
    return {
        type: 'CANCEL_FETCH'
    }
}

export function startTimer(){
    return {
        type: 'START_TIMER'
    }
}

export function stopTimer(){
    return {
        type: 'STOP_TIMER'
    }
}

export function resetTimer(){
    return {
        type: 'RESET_TIMER'
    }
}

export function changeSelectedImage(index){
    return {
        type: 'CHANGE_SELECTED_IMAGE',
        payload: {
            index
        }
    }
}

export function loadImages(){
    return {
        type: 'LOAD_IMAGES'
    }
}

export function changePassword(password){
    return {
        type: 'CHANGE_PASSWORD',
        password
    }
}

export function logIn(password){
    return {
        type: 'LOGIN',
        password
    }
}