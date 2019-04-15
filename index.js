console.log(`Let's see what we get!`);

const Twit = require('twit');
const config = require('./config.js');
const say = require('say');
const Sentiment = require('sentiment');
const player = require('play-sound')((opts = {}));

const T = new Twit(config);

const params = {
  q: 'Trump',
  count: 1,
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  const texts = data.statuses;
  const screenName = data.statuses;
  const sentiment = new Sentiment;
  for (let i = 0; i < texts.length; i++) {
    console.log(screenName + texts[i].text);
    const result = sentiment.analyze(texts[i].text);
    say.speak(texts[i].text);
    console.log(result.score);
    const song = result.score;
    function sing(song) {
      if (result.score > 0 && result.score <= 5) {
        return './assets/robin.wav';
      } else {
        return './assets/raven.wav';
      }
    }
    player.play(sing(song)), function(err) {
      if (err) throw err;
    };
  }
}

