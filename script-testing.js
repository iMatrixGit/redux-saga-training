import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { curry } from 'ramda';

const initialState = {
    spots: [
        {
            "id": "053af987d099c6_1",
            "type": "post",
            "creationDate": 1472218607949,
            "expirationDate": "1472566939523",
            "data": {
                "displayMode": "fill",
                "post": {
                    "message": {
                        "id": "053af987d099c6_1",
                        "date": 1472218283416,
                        "username": "PrachiK",
                        "text": "$OIL fell on Friday and was set for its largest weekly decline in a month. Brent crude oil futures were down 32 cents at $49.35 per barrel by 1144 GMT, while WTI crude was down 22 cents at $47.11 a barrel.\r\nhttp://yhoo.it/2c1ts74",
                        "imageId": "prachik-1472218282143",
                        "attachedImage": {
                            "name": "prachik-1472218282143",
                            "imageType": "png",
                            "dimensionsOriginal": {
                                "width": 593,
                                "height": 387
                            },
                            "dimensionsThumbnail": {
                                "width": 593,
                                "height": 387
                            }
                        },
                        "mood": "bearish",
                        "instruments": [
                            "OIL"
                        ],
                        "topics": [],
                        "mentionedUsers": []
                    },
                    "user": {
                        "username": "PrachiK",
                        "fullName": "Prachi K",
                        "isPro": false
                    },
                    "agreedWithBy": [
                        "mihael"
                    ],
                    "agreeCount": 1,
                    "replyCount": 2,
                    "userOpinion": "neutral"
                }
            }
        },
        {
            "id": "index-us-friday-1472221659485",
            "type": "video",
            data: {
                "title": "Bulls rejoice",
                "description": "rate hike(s) coming",
                "displayMode": "fill"
            },
            "creationDate": "1472221659485",
            "expirationDate": "1472480820000"
        }
    ]
};

const state = Immutable.fromJS(initialState);

const parseSpotBaseData = spot => ({
    id: spot.get('id'),
    type: spot.get('type'),
    creationDate: spot.get('creationDate'),
    expirationDate: spot.get('expirationDate'),
    displayMode: spot.getIn(['data', 'displayMode'])
});

const getSpots = state => state.get('spots');

const getPost = state => state.getIn(['data', 'post']);

const parseStaticSpotData = post => ({
    username: post.getIn(['user', 'username']),
    agreedWithBy: post.get('agreedWithBy'),
    agreeCount: post.get('agreeCount'),
    replyCount: post.get('replyCount'),
    userOpinion: post.get('userOpinion')
});

const spotsSelector = createSelector([
    getSpots
], spots => {
        return spots.map(spot => {
            if (spot.get('type') === 'video') {
                return {
                    ...parseSpotBaseData(spot),
                    title: spot.getIn(['data','title']),
                    description: spot.getIn(['data', 'description'])
                };
            }

            return {
                ...parseStaticSpotData(getPost(spot))
            }
        })
    }
);

const prefixWithSymbol = curry((symbol, string) => `${symbol}${string}`);

const prefixWithDollar = prefixWithSymbol('$');
const prefixWithHashTag = prefixWithSymbol('#');

const instruments = ['GOLD', 'SILVER', 'OIL'];
const topics = ['FOREX', 'DAX', 'CHINA'];

console.log(prefixWithSymbol('&', 'AMPERSAND'));


console.log(curry);
console.log(instruments.map(prefixWithDollar));
console.log(topics.map(prefixWithHashTag));

//console.log(spotsSelector(state).toJS());