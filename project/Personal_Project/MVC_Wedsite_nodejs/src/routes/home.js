// đây là file chứa các route của trang home

const express = require('express');
const router = express.Router(); // sử dụng function của express

const homeController = require('../app/controller/HomeController');

router.use('/:slug', homeController.detail)  // phải để trên '/'

router.use('/', homeController.index); // gọi sang controller để lấy function handler
//do bên >routes/index.js đã có định tuyến cho home.js là /home rồi
//=> chỉ cần '/' để dùng controller


module.exports = router;    