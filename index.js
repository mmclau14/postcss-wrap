var postcss = require('postcss');
require('colors');
module.exports = postcss.plugin('postcss-wrap', function (opts_) {
    var opts = opts_ || {};
    var skip = opts.skip instanceof Array ? opts.skip : (opts.skip ? [opts.skip] : []);
    var selectorsBlacklist = [/^from/, /^to/, /\%$/].concat(skip);
    return function (css, result) {
        if (!opts.selector) {
            result.warn('opts.selector must be specified'.red);
            return;
        }
        css.walkRules(walker);
        css.walkAtRules(walker);

        function walker(node) {
            var selectors = node.selectors;
            node.selectors = selectors.map(function (selector) {
                return selectorsBlacklist.find(function (matcher) {
                    return selector.match(matcher);
                }) || opts.selector + ' ' + selector;
            });
        }
    };
});