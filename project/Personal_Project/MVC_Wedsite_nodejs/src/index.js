const express = require('express'); 
const app = express();
const port = 3000; 
const morgan = require('morgan'); // morgan
const handlebars = require('express-handlebars'); // handlebars
const path = require('path'); // path
const { join } = require('path'); 


app.use(morgan('combined')); 
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' })) 
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname,'public'))); // file tĩnh

// app.get('/home', (req, res) => {
//     res.render('home');
// });

app.get('/detail', (req, res) => {
  res.render('detail');
});
// => đã chuyển code theo mô hình MVC

// sau khi tách phần route chính vào trong folder routes thì sẽ import lại để chạy
// => từ nay các route không cần phải viết vào trong đây nữa => trống và gọn

const router = require('./routes'); // sẽ tự động vô file index

router(app); // gọi lại hàm và nạp app vào => route init

app.listen(port, () => { // lắng nghe cổng port (ko lắng nghe thì méo có gì đâu) 
    console.log(`Example app listening on port ${port} hehehe`);
    console.log(`the local host: http://localhost:${port}`);
  });

