MÔ HÌNH MVC: MODLE - VIEW - CONTROLLER

Model (cơ sở dữ liệu): Quản lí xử lí các dữ liệu.
    => database

View (giao diện): Nới hiển thị dữ liệu cho người dùng.
    => chỉ chứa các file hiển thị như html, css ...

Controller (bộ điều khiển): Điều khiển sự tương tác của hai thành phần Model và View.
    => sẽ liên kết vs client:
            - từ chrome của client sẽ nhập url để requesst truy cập vào 1 wed server(host)
            - trong host yêu cầu sẽ đi qua các tầng:
                + router: là phần xác định đường dẫn (app.get('<router>',.....))
                + dispatcher: gọi sang 1 Controller  ( app.get('<router>',<Controller>) ) khi có router phù hợp
            
            - Controller sẽ gọi sang Model để lấy dữ liệu 
            - Controller sẽ lấy thông tin của View 
            - sử lý ra 1 wed hoàn chình 
            - trả về chrome
    
=> dựa vào mô hình MVC ta sẽ có 3 folder chính (3 folder này có thể nằm ở nhìu server khác nhau (wed hoặc database))
    *** tuy nhiên đã có folder views r => lo cái Controller/router

    >node_modules
    >src    
        index.js
        >app    
            >controller                               => controller
                homeController.js
        >public
            >css
                app.css
            >image
        >resources
            >scss
                app.scss
            >views                                     => views
                home.handlebars
                >layouts
                    main.handlebars
                >partials
                    header.handlebars
                    footer.handlebars
        >routes                                        => routes
            home.js

    {} package.json
    {} package-lock.json


ok ssau khi set up như v thì cơ bản đã có thể nhét wed honkai vô rồi
=> tiến hành chia code theo mô hình MVC:

trong index.js:
    thông thường sau khi mở server local bằng câu lệnh npm start thì nó sẽ chui vôi file index
    sau đó nó sẽ kím đường dẫn (router) rồi thực thi (controller):
        app.get('<router>',<Controller>)
    => nhét <Controller> vào >app\controller\homeController.js
        qua đó xem
    => nhét <router> vào >routes\home.js
        cũng qua đó xem

    trong folder routes sẽ chứa các đường định tuyến:
        - định tuyến tổng chứa các method + route                   => index.js
            => qua đó xem file
        - định tuyến chi tiết từng route                            => home.js ....
            =>qua đó xem
    => về cơ bản thì khi có url thì nó sẽ đi vào trong:
        ->    >src/index.js                   => thấy dòng route(app);
        ->    >routes/index.js                => app.use('/news', homeRouter);
        ->    >routes/home.js                 => router.use('/', homeController.index);
        ->    >app/controller/HomeController  để lấy code 

    vd bây h trong trang home có thêm 1 trang con là home/detail
        => trong HomeController sẽ có thêm 1 phương thức detail
        => trong home.js sẽ có thêm 1 route gọi sang phương thức detail: router.use('/:slug', homeController.detail) 
        và tất nhiên ko cần sửa trong file >src/index.js và >routes/index.js 
        => tách ra tiện vl
    => ta có thể vô http://localhost:3000/home/sfhsjd để vô detail


*** mấy cái trên là tổng quát dùng cho các wed lớn với việc 1 trang có nhìu trang con
=> mình gà nên chỉ cần 1 controller chính chứa cả home, news, search gọi là SideController      :)

//////////////////
sau mớ trên là xong phần controller
=> đến phần MODLE:


-   tải MongoDB về sài 
    => sử dụng phiên bản : MongoDB Community Server
-   kết nối:
    mở MongoDB Compass lên và tạo một database mới:
        + tạo một new connect tới localhost tên là default_host
        + tạo 1 database mới: tên là f8_MVC_Wed với colection là một dữ liệu ban đầu
    
    ** lưu ý NoSQL là kiểu database document
        => nó sẽ lưu trữ các document(kiểu JSON) trong các colection
        => tập hợp các colection sẽ là 1 database

    tải thư viện mongoose về để sài => nó sẽ giúp tối ưu và che lấp các khuyết điểm của NoSQL so vs NoSQL
        lên gg kím Automattic/mongoose của github
        => npm install mongoose
    sau đo cấu hình cho nó:
        tạo thư mục config:
            >src/config/db/index.js
            => qua đó xem
    