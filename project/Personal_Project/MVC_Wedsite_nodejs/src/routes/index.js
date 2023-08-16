// đây là file để quản lý các route của cả wed (project)


const homeRouter = require('./home') // đây là đường dẫn cho trang home

function route(app){ // tạo một function để chứa các đường dẫn chính bên file src => làm gọn bên đó

    // app.get('/home', (req, res) => {
    //     res.render('home');
    // });
    // thay vì viết như trên thì ta sẽ viết:
    app.use('/home', homeRouter); // vs app.use sẽ tự động khớp vs các HTTP method

// và tất nhiên cũng không thể đưa tất cả các route vào đây.
// do trong thực tế thì 1 wed có nhiều trang, 1 trang có thể có nhiều tương tác => có nhiều route khác nhau
// => ta nên tách các route thuộc cùng 1 trang ra 1 file riêng.
// vd: ta tách trang home ra thành 1 route riêng: homeRouter

}

module.exports = route;
