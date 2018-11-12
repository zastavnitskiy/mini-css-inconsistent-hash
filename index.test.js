const webpack = require('webpack');
const config = require('./webpack.config');

it('should test', (done) => {
    webpack(config, (err, stats) => {
        expect(stats.toJson()).toMatchSnapshot();

        done();
    });
});