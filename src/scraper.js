
const axios = require('axios');
const cheerio = require('cheerio');
const indipendent = require('./websites/the-indipendent');

module.exports = new Promise((res, rej) => {
    axios.get(indipendent.url).then(({ data }) => {
        res(indipendent.res(cheerio.load(data)));
    }).catch(rej);
});
