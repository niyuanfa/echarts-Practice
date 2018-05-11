var ajax = require('axios');

var request = function(options) {
    var url = options.url;

    if (!/http.*/.test(url) && __GLOBALCONFIG && __GLOBALCONFIG.server) {
        url = __GLOBALCONFIG.server + url;
    }

    var data = options.data || null;
    var method = (options.method || 'get').toLowerCase();
    var header = options.header || null;
    var dataType = options.dataType || null;

    var successCallback = function(res) {
        if (typeof(options.success) === 'function') {
            options.success(res);
        }
        if (typeof(options.complete) === 'function') {
            options.complete(null, res);
        }
    }

    var errorCallback = function(res) {
        if (typeof(options.fail) === 'function') {
            options.fail(res);
        }
        if (typeof(options.complete) === 'function') {
            options.complete(res, null);
        }
    }

    var option = {
        'url': url,
        'method': method,
        'headers': header,
        'responseType': dataType,
        'timeout': 60000,
        'withCredentials': false
    };
    if (method === 'get') {
        option.params = data;
    } else {
        option.data = data;
    }
    ajax.request(option).then(successCallback).catch(errorCallback);
};
module.exports = request;
