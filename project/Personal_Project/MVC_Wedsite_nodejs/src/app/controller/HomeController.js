// đây là file chứa các function handler của trang home

// về cơ bản ko thể viết nhiều function handler (do export ra đc 1 thứ thôi) vào file .js 
// => cần phải tạo 1 class rồi exports ra
// => trong file index.js phải require(<class>) vào (import á)




class HomeController { // đặt trùng tên vs file
// nhét function handler vào thành 1 phương thức
// đặt tên là index do nó là phương thức dùng để lấy nội dung của trang ra hiển thị

    // [GET] /home   => ghi chú phương thức + đường dẫn để gọi phương thức này
    index(req, res){
        res.render('home');
    }

    // [GET] /home/:slug
    // với :slug là 1 biến động => nó có thể home/bất-cứ-thứ-gì
    detail(req, res) {
        res.render('detail')
    }
}

module.exports = new HomeController; // exports để import sài sau
