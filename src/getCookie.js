const bypassCapcha = require('./bypassCapcha')
const getCapcha = require('./getCapcha')

module.exports = async () => {
    let result = await getCapcha()
    let cookie = await bypassCapcha(result[0], result[1], result[2])
    return await cookie
}