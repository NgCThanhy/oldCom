// sau khi npm install express thì nó sẽ tải các file thư viện lưu vào folder node_modules 
const express = require('express'); // yêu cầu (import) thư viện express trong folder node_modules với vertion đc xác định trong package.json
const app = express(); // gọi lại function bằng () và lưu lại đối tượng nó trả về
const port = 3000; // định nghĩa cổng để chạy trong localhost

const morgan = require('morgan'); // import thư viện morgan để debug terminal

app.use(morgan('combined')); // xác định việc sử dụng morgan ở phiên bản combined (mún khác thì lên gg kím)



// import { engine } from 'express-handlebars'; // import thư viện handlebars để cấu hình wed html
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' })) // định nghĩa template engine sẽ sử dụng đặt tên là 'handlebars' 
app.set('view engine', 'handlebars'); // xác định app của chúng ta sẽ sử dụng view engine là handlebars

// xác định vị trí của folder views để render:
// app.set('views', 'src/resources/views'); // có thể xác định thủ công như lày
// hoặc sài thư viện path để xác định (sài cái này ok hơn khi sau này có di dời project)
const path = require('path'); // thư viện built in => ko cần tải
const { join } = require('path');
// console.log('hahahah: ', path.join(__dirname, 'resources/views'))  // xem đê
app.set('views', path.join(__dirname, 'resources/views'))


/** cách routing trong nodejs:
 * routing là việc khi người dùng nhập một url (uri hoặc path nào cũng v ) vào trình duyệt wed 
 * sau đó url đó sẽ sử dụng các phương thức của giao thức HTTP để tương tác vs host ( GET, POST....)
 * sau đó sẽ nhận về các phản hồi
 * 
 * một route dùng để định nghĩa các hoạt động trên. mỗi route thường bao gồm 1 đường dẫn (path) và 1 hàm sử lý
 *    khi url khớp vs path thì hàm sẽ đc gọi
 * 
 * cú pháp: 
 *      app.METHOD(PATH, {})
 *  với app là trả về của express
 *      METHOD là các phương thức request HTTP viết THƯỜNG
 *      PATH là đường dẫn trên server
 *      {} là hàm sẽ được gọi khi PATH khớp
 *
 * vd phương thức get:
 * nhận 2 đối số:
 *  - route (tuyến đường)
 *      vd:'/' hoặc '/trang-chu'
 *  - 1 function:
 *      để chạy khi get đc url mà có '/' gì đó
vd:
app.get('/hello', (req, res) => {
  res.send(`<h1 style = "color: red">Hello World!</h1>`)
});

với:
    req -> request      =>  chứa thông tin của ứng dụng gửi url 
    res -> response     =>  chứa thông tin, kiểu trả về

  nên nhớ đa số những gì trong project này đều nằm trên server (localhost)
  => chrome là client sẽ gửi request thông qua việc nhập url
  sau host khi nhận các thông tin có trong req thì hàm sẽ sử lý và quyết định các dữ liệu sẽ trả về cho client 
  => các thông tin đó sẽ chứa trong res

về cơ bản thì nó sẽ là giá trị response về và lưu trong phần source của wed
các phiên bản trình duyệt wed mới sẽ đủ thông minh để chuyển 1 dòng html trên thành 1 file html hoàn thiện 
=> khi hiển thị sẽ thấy đc tag html đó một cách rõ ràng
 */

// get khi có handlebars
app.get('/', (req, res) => { res.render('home'); });
// với render sẽ auto chui vào folder views và kím file home.handlebars
app.get('/news', (req, res) => { 
                                 console.log('object query: ', req.query);
                                 res.render('news'); 
                               }); 
// => gõ vô url thành http://localhost:3000/news thử xem

app.get('/search', (req, res) => { res.send(`<h2>từ khóa bạn nhập là: ${req.query.key_word}<h2/>`); }); // trang search



app.get('/login', (req, res) => { res.render('login'); }); // trang đăng nhập

app.use(express.urlencoded({extended: true})); // thư viện để sài biến body lưu dữ liệu của form POST
app.use(express.json());  // tiện tay add vô để sau này POST thông qua các phương pháp khác vẫn lấy dữ liệu đc
// xác định method post từ trang đăng nhập:
app.post('/login', (req, res) => { 
  console.log('object body: ', req.body);
  res.render('login'); 
}); 




app.listen(port, () => { // lắng nghe cổng port (ko lắng nghe thì méo có gì đâu) 
  console.log(`Example app listening on port ${port} hehehe`);
  console.log(`the local host: http://localhost:${port}`);
});
// => nói chung khi chạy file này với nodejs thì nó sẽ khai báo rằng:
// app được khởi tạo từ express và lắng nghe cổng 3000 trên localhost

app.use(express.static(path.join(__dirname,'public'))); // xác nhận việc sử dụng folder public chứa file tĩnh (có thể truy cập trực tiếp bằng url)
