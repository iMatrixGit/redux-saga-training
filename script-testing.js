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

const constrain = ({ low, high, value }) => {
    if (typeof (low + high + value) !== 'number') {
      throw new Error('Incorrect arguments types. Expect numbers only.')
    }

    return Math.min(Math.max(low, value), high);
};

console.log(constrain({ low: -40, high: -30, value: -20 }));

class Word extends React.Component {
    constructor() {
        super();

        this.state = { isVisible: true };

        this.calculateState = this.calculateState.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.calculateState);
    }
    componentDidMount() {
        const { top } = this.wordNode.getBoundingClientRect();

        this.setState({ isVisible: top < 40 });
    }

    componentWillUnmount() {
        window.removeEventListenet(this.calculateState);
    }

    calculateState() {
        const { top } = this.wordNode && this.wordNode.getBoundingClientRect();

        this.setState({ isVisible: top < 40 });
    }

    render() {
        const { text } = this.props;
        const { isVisible } = this.state;
        const color = !isVisible ? 'red' : 'black';
        const className = isVisible ? 'visible' : 'hidden';

        return (
            <span
                style={{ color }}
                ref={node => this.wordNode = node}
            >
				{isVisible ? text : null}
			</span>
        );
    }
}

class WordsWrapper extends React.Component {
    constructor() {
        super();

        //this.renderWords = this.renderWords.bind(this);
    }
    renderWords = () => {
        const { text } = this.props;
        const words = text.split(' ');

        return words.map((word, index) => {
            if (index === words.length - 1) {
                return (
                    <Word
                        key={index}
                        text={word}
                    />
                );
            }

            return <Word text={word + ' '} />
        });
    }

    render() {
        return (
            <div className="words-wrapper">
                {this.renderWords()}
            </div>
        );
    }
}

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";

ReactDOM.render(
    <WordsWrapper text={text} />,
    document.getElementById('container')
);
