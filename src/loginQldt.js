const requestPromise = require('request-promise')
const getCookie = require('./getCookie')
const URI = 'http://qldt.ptit.edu.vn/Default.aspx?page=gioithieu'
const REGEX_VIEWSTATE = /id=\"__VIEWSTATE\" value=\"(.+?)\" \/>/

module.exports = async (username, password) => {
    let cookie = await getCookie()
    let config = {
        uri: URI,
        method: 'GET',
        headers: {
            'Cookie': cookie
        },
        simple: false
    }
    let result = await requestPromise(config)
    let configMain = {
        uri: URI,
        method: 'POST',
        formData: {
            '__VIEWSTATE': '',
            'ctl00$ContentPlaceHolder1$ctl00$ucDangNhap$txtTaiKhoa': username,
            'ctl00$ContentPlaceHolder1$ctl00$ucDangNhap$txtMatKhau': password,
            'ctl00$ContentPlaceHolder1$ctl00$ucDangNhap$btnDangNhap': 'Đăng Nhập'
        },
        headers: {
            'Cookie': cookie
        },
        simple: false
    }
    configMain.formData['__VIEWSTATE'] = await result.match(REGEX_VIEWSTATE)[1]

    let login = await requestPromise(configMain)
    if (login.includes('Object moved')) {
        await console.log(username, password)
    }
    return await true
}