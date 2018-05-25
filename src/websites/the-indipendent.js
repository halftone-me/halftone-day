const querystring = require('querystring');

module.exports = {
    url: 'https://www.independent.co.uk/',
    res: page => {
        return {
            img: page('.image_wrapper .image').attr('data-original'),
            message: `The Indipendent - ${page('article.weight-2 h1 a').first().text()}`
        }
    }
}
