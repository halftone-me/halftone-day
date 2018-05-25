// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer()
const halfTone = require('./Halftone.vue').default;
const tweet = require('./tweet');
const Vue = require('vue');
const https = require('https');
const fs = require('fs');
const sharp = require('sharp');
const getPixels = require("get-pixels");


require('./scraper').then(({img, message}) => {
    getPixels(img, (err, pixels) => {

        sharp(pixels.data, {raw: {width: pixels.shape[0], height: pixels.shape[1], channels: pixels.shape[2]}})
            .resize(100,100)
            .max()
            .raw()
            .toBuffer({ resolveWithObject: true })
            .then(({data, info}) => {

                const props = {
                    img: {
                        width: info.width,
                        height: info.height,
                        data
                    }
                };
                halfTone.propsData = props;

                renderer.renderToString(new Vue(halfTone)).then(html => {
                    sharp(new Buffer(html)).background('white').flatten().png().toBuffer().then(data => tweet(data, message));
                }).catch(err => {
                    console.error(err)
                });

            });

    });
});
