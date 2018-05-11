module.exports = function() {
    var storage = function(fn, options) {
        try {
            if (options) {
                if (options.key && options.data) {
                    return localStorage[fn](options.key, options.data);
                } else {
                    return localStorage[fn](options.key);
                }
            } else {
                localStorage[fn]();
            }
            typeof options.success == 'function' && options.success();
        } catch (e) {
            typeof options.fail == 'function' && options.fail(e);
        } finally {
            typeof options.complete == 'function' && options.complete();
        }
    }

    this.setStorage = function(options) {
        storage('setItem', options);
    }

    this.setStorageSync = function(options) {
        localStorage.setItem(options.key, options.data);
        return true;
    }

    this.getStorage = function(options) {
        return storage('getItem', options);
    };

    this.getStorageSync = function(options) {
        var res = localStorage.getItem(options.key);
        return res == "undefined" ? null : res;
    };

    this.getStorageInfo = function(options) {
        return {};
    };

    this.getStorageInfoSync = function(options) {}

    this.removeStorage = function(options) {
        storage('removeItem', options);
    };

    this.removeStorageSync = function(options) {
        return localStorage.removeItem(options.key);
    };

    this.clearStorage = function() {
        storage('clear');
    };

    this.clearStorageSync = function() {
        return localStorage.clear();
    };
    return this;
}
