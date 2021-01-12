const checkAccount = require('./checkAccount');

(async () => {
    try {
        await console.log('Đang scan, đợi mình chút...')
        await checkAccount()
    } catch (err) {
        console.log(err)
    }
})()