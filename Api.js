//  'http://jsonplaceholder.typicode.com';

export function ajaxCall(url, callback){

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', resp => {
        callback.call(this, resp.target.response);
    });

    xhr.open('GET', url);
    xhr.send();

}

export function request(url){
    return new Promise((resolve, reject) =>
        ajaxCall(url, resp => {
            if( resp.status < 400 ) {
                resolve(resp)
            } else {
                reject(resp)
            }
        })
    );
}

export function fetchImages () {
    const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;
    return fetch(API_ENDPOINT).then(function (response) {
        return response.json().then(function (json) {
            return json.photos.photo.map(
                ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            );
        })
    })
};

function *main(){
    const result1 = yield request('http://jsonplaceholder.typicode.com/posts/1');
    const data = JSON.parse(result1);
    const result2 = yield request('http://jsonplaceholder.typicode.com/posts/2');
    const data2 = JSON.parse(result2);

    console.log('Data 1:', data);
    console.log('Data 2:', data2);

}

/*
const it = main();

it.next();*/
