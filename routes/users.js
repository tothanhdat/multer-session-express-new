const express = require('express');
const router = express.Router();
const UPLOAD_CONFIG = require('../utils/multer.config');
const { REMOVE_IMAGE } = require('../utils/remove_image');
const path = require('path')

const users = [
    { username: 'abc', password: 'abc', image: '1561105111045Opis.png' },
    { username: 'cde', password: 'cde', image: '1561105111045Opis.png' },
];

const usersTest = [
    {
        username: 'abc',
        images: [
            'abc.png', 'abc2.png', 'abc1.png'
        ]
    },
    {
        username: 'cde',
        images: [
            'cde.png'
        ]
    }
];

router.get('/list', (req, res) => {
    console.log({ users });
    res.render('users', { users })
});

router.post('/add-user', UPLOAD_CONFIG.single('image'), (req, res) => {
    const { originalname } = req.file;
    const { username } = req.body;
    const infoUser = { username: username, image: originalname }
    console.log(infoUser);

    users.push(infoUser);
    res.redirect('/user/list');
});

router.get('/remove/:username', async (req, res) => {
    const { username } = req.params;
    const indexFinded = users.findIndex(user => Object.is(username.toString(), user.username.toString()));
    const infoUserRemoveImage = users[indexFinded];

    const imagePathRemove = path.resolve(__dirname, `../public/upload/${infoUserRemoveImage.image}`);
    console.log(infoUserRemoveImage.image);

    let result = await REMOVE_IMAGE(imagePathRemove, users, indexFinded);

    res.redirect('/user/list');
});

//THEM NHIEU IMAGE TREN MOT USER
router.get('/list-demo', (req, res) => {
    res.render('demo2', { usersTest })
});

//REMOVE
router.get('/remove2/:username', async (req, res) => {
    const { username } = req.params;
    const indexFinded = usersTest.findIndex(user => Object.is(username.toString(), user.username.toString()));
    const infoUserRemoveImages = usersTest[indexFinded];
    const imageUser = infoUserRemoveImages.images.forEach(async image => {
        const imagePathRemoves = path.resolve(__dirname, `../public/upload/${image}`);
        let result = await REMOVE_IMAGE(imagePathRemoves, usersTest, indexFinded);
    })
    res.redirect('/user/list-demo');
});

//ADD
router.post('/add-user2', UPLOAD_CONFIG.single('image'), (req, res) => {
    const { originalname } = req.file;
    const { username } = req.body;
    const infoUser = { username: username, images: originalname }
    console.log(infoUser);

    users.push(infoUser);
    res.redirect('/user/demo2');
});
module.exports = router;