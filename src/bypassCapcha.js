const requestPromise = require('request-promise')

module.exports = (viewstate, capcha, header) => {
    let cookie = header['set-cookie'][0].split(';')[0]
    let config = {
        uri: 'http://qldt.ptit.edu.vn/Default.aspx?page=gioithieu',
        method: 'POST',
        formData: {
            '__VIEWSTATE': viewstate,
            'ctl00$ContentPlaceHolder1$ctl00$txtCaptcha': capcha,
            'ctl00$ContentPlaceHolder1$ctl00$btnXacNhan': 'Vào website'
        },
        headers: {
            'Cookie': cookie
        },
        simple: false
    }
    return new Promise((resolved, reject) => {
        requestPromise(config, (err, res, body) => {
            if (err) reject(err)
            if (body.includes('Object moved')) resolved(cookie)
        })
    })
}