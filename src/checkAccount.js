const { eachLine } = require('line-reader')
const loginQldt = require('./loginQldt')

module.exports = () => {
    eachLine(__dirname + '/acc.txt', async (line, last) => {
        await loginQldt(line.split('|')[0], line.split('|')[1])
    })
}