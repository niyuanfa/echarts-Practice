import {Page} from './page.js'
import {App} from './app.js'

import {lifecycle} from './lifecycle.js'

import * as tools from './tools.js'

import wxApi from './wx-api'

let wx = wxApi()
export {
    Page,
    App,
    tools,
    lifecycle,
    wx
}