const requestPromise = require('request-promise')
const REGEX_CAPCHA = /size=\"6\">(.+?)<\/font>/
const REGEX_VIEWSTATE = /id=\"__VIEWSTATE\" value=\"(.+?)\" \/>/

module.exports = () => {
    let config = {
        uri: 'http://qldt.ptit.edu.vn/Default.aspx?page=gioithieu',
        method: 'GET',
        simple: false
    }
    return new Promise((resolved, reject) => {
        requestPromise(config, (err, res, body) => {
            if (err) reject(err)
            resolved([body.match(REGEX_VIEWSTATE)[1], body.match(REGEX_CAPCHA)[1], res.headers])
        })
    })
}