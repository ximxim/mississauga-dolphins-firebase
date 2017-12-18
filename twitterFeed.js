const twitter = require('twitter');

module.exports = (config) => {
    const client = new twitter(config);
    const params = { screen_name: 'M_Dolphins', count: '200' };

    return new Promise((resolve, reject) =>
        client.get(
            'statuses/user_timeline',
            params,
            (error, tweets) => (error) ? reject(error) : resolve(tweets))
    );
};
