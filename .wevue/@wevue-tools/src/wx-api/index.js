var request = require('./request');
var storage = require('./storage');
var nav = require('./nav');
var user =require('./user');
import Vue from 'vue'
var wx = function() {
    var api = {
        Vue
    };
    api.request = request;
    storage.call(api);
    nav.call(api);
    user.call(api);
    return api;
};

module.exports = wx;