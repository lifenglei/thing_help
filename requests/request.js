/**
 * 页面数据请求
 */
var api = require('./api.js');
var utils = require('../utils/util.js');
var Promise = require('./promise.js');
// 创建promise
function wxPromisify(fn) {
    return function(obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function(res) {
                //成功
                resolve(res)
            }
            obj.fail = function(res) {
                //失败
                reject(res)
            }
            fn(obj)
        })
    }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
/**
 * 微信请求get方法
 * url
 * data以对象形式传入
 */
function getRequest(url, data) {
    var getRequest = wxPromisify(wx.request)
    return getRequest({
        url: url,
        method: 'GET',
        data: data,
        header: {
            'Content-Type': 'application/json'
        }
    })
}
/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
    var postRequest = wxPromisify(wx.request)
    return postRequest({
        url: url,
        method: 'POST',
        data: data,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
    })
}
module.exports = {
    getRequest: getRequest,
    postRequest: postRequest
}