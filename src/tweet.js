const TwitterPackage = require('twitter');

const secret = {
    consumer_key: process.env['TWITTER_CONSUMER_KEY'],
    consumer_secret: process.env['TWITTER_CONSUMER_SECRET'],
    access_token_key: process.env['TWITTER_ACCESS_TOKEN_KEY'],
    access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
}

const client = new TwitterPackage(secret);

module.exports = (data, message) =>{
    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', {media: data}, function(error, media, response) {

        if (!error) {

            // If successful, a media object will be returned.
            console.log(media);

            // Lets tweet it
            var status = {
                status: message,
                media_ids: media.media_id_string // Pass the media id string
            }

            client.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                    console.log(tweet);
                }
            });

        }
    });
};
