const express = require('express');
const router = express.Router();

const userSession = {
    username: 'tothanhdat',
    password: '123',
}
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const checkUsername = Object.is(username, userSession.username)
    const checkPassword = Object.is(password, userSession.password)
    console.log(checkUsername, checkPassword);
    if (checkUsername && checkPassword){
        req.session.LOGIN = true;
        res.redirect('/dashboard')
    }
    else {
        res.redirect('/login')
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/dashboard', (req, res) => {
    const { LOGIN } = req.session;
    if (LOGIN) return res.json({ message: 'CHAO BAN TRANG DASHBOARD' })
    res.redirect('/err-login')
})
router.get('/err-login', (req, res) => {
    res.json({ message: 'VUI LONG DANG NHAP' })
})
module.exports = router;