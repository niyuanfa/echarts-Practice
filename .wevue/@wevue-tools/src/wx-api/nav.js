module.exports = function () {
    var doNavOrRedirectOpt = function (type, options) { //处理跳转逻辑
        if (!type) {
            return;
        }
        if (!options) {
            return
        }
        var url;
        url = options.url || ''
        try {
            if (type === "navigateTo") {
                __WEVUE_GI.PVAPP.$router.push(url)
            } else if (type === "redirectTo") {
                __WEVUE_GI.PVAPP.$router.replace(url)
            } else if (type === "navigateBack") {
                var delta = options.delta
                if (!delta) {
                    return;
                }
                if (typeof delta !== 'number') {
                    return;
                }
                delta = -delta
                __WEVUE_GI.PVAPP.$router.go(delta)
            }
            try {
                if (options.success) {
                    options.success()
                }
            } catch (e) { }
        } catch (e) {
            try {
                if (options.fail) {
                    options.fail()
                }
            } catch (e) { }
        }

        try {
            if (options.complete) {
                options.complete()
            }
        } catch (e) { }
    }
    this.navigateTo = function (options) {
        doNavOrRedirectOpt('navigateTo', options)
    };
    this.redirectTo = function (options) {
        doNavOrRedirectOpt('redirectTo', options)
    };
    this.switchTab = function (options) { };
    this.navigateBack = function (options) {
        doNavOrRedirectOpt('navigateBack', options)

    };
    //设置导航条
    this.setNavigationBarTitle = function (options = {}) {
        if (typeof options != 'object') {
            return undefined
        }
        try {
            if (options.title) {
                document.title = options.title
            }
            if (options.success) {
                options.success()
            }
        } catch (e) {
            if (options.fail) {
                options.fail(e)
            }
        } finally {
            if (options.complete) {
                options.complete()
            }
        }
    };
    return this;
}
