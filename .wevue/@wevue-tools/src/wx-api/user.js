var Cookie = require('vue-cookie');

module.exports = function() {
    var _token = "_token";

    this.signin = function(options) {
        this.request({
            url: options.url || '/api/login',
            method: 'post',
            data: {
                username: options.username,
                password: options.password
            },
            success: function(res) {
                if (res.remember && res.remember === true) {
                    Cookie.set(_token, res.data.token, {expires:res.data.expires});
                } else {
                    Cookie.set(_token, res.data.token);
                }
                options.success && options.success(res);
            },
            fail: options.fail,
            complete: options.complete
        });
    };

    this.getUser = function(options) {
        var option = options || {};
        var url = option.url || '/api/get_user';
        var token = option.token || Cookie.get(_token);
        this.request({
            url: url,
            method: 'post',
            header: {
                'Authorization': token
            },
            success: option.success,
            fail: option.fail,
            complete: option.complete
        });
    };

    this.checkUserSession = function(options) {
        return Cookie.get(_token) !== null && Cookie.get(_token) !== "undefined"
    };

    this.logout = function(){
      Cookie.delete(_token);
      return true;
    }

    this.login = function(options) {
        console.log('please use wx.signin');
    };

    this.checkSession = function(options) {
        console.log('please use wx.checkUserSession');
    };

    this.getUserInfo = function(options) {
        console.log('please use wx.getUser');
    };
    return this;
}
