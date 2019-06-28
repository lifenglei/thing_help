import Promise from 'bluebird';

function formatTime(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getDateStr(date) {
    if (!date) return '';
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
function pagination(pageNo, pageSize, array) {
  var offset = (pageNo - 1) * pageSize;
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
}

/**
 * 生成GUID序列号
 * @returns {string} GUID
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



/**
 * @param {Function} func 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
*/
function promiseHandle(func, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
        if (typeof func !== 'function')
            reject();
        options.success = resolve;
        options.fail = reject;
        func(options);
    });
}

module.exports = {
    formatTime: formatTime,
    guid: guid,
    pagination: pagination,
    promiseHandle: promiseHandle,
    getDateStr: getDateStr,
    formatNumber: formatNumber
}
