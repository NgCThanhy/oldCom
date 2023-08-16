THỰC HÀNH TẠO 1 WED

Các bước làm:
- phân tích WED
- dựng nền
- xây dựng từng phần chi tiết
- hoàn thiện

MỘT SỐ LỖI KHI LÀM:
    - chú ý đối tượng thuộc block nào. vd ký tự trong phần a mà css cho li thì ko đc
    - do có thể truy cập đc vào các lớp con bình thường nên đừng đặt nhìu lớp quá
    - sử dụng truy suất vào lớp con trực tiếp ">" (vd div > a => chọn a là con trực tiếp của div )
    - chú ý lỗi nổi lên khi dùng fixed

1/ phân tích:
    a/ 1 wed thường có các thành phần sau:
        thành phần chính:
        - Header (đầu trang)
        - sidebar (thanh bên)
        - container (phần chứa các nội dung chính)
        - Footer (chân trang)
        
        ngoài ra còn một số thành phần khá có thể nằm tại bất cứ đâu trên các thành phần chính:
        + Navigation (thanh điều hướng)
        + Bread crumb (thanh chỉ vị trí hiện tại)
        + slider (khối trượt)
        + banner (ảnh quản cáo)
        + content (nội dung chính)

    b/ xem xét mẫu wed:
        https://www.w3schools.com/w3css/tryw3css_templates_band.htm
    
    đây là dạng wed One Page (chỉ có 1 trang chứa tất cả thông tin => ít link sang wed khác)
    => thường dùng để giới thiệu

    nhìn vào Header thấy phần Navigation có 4 phần chính => content có 4 phần

    tại phần Header:
    - Navigation :
        + home
        + band
        + tour
        + contact
        + more 
    - search
    
    do ở đây chỉ có 1 nội dung chính => bỏ container lun
    nhưng ko thích bỏ cơ => chia ra tại container:
    - có 1 slider chiếu các hình ảnh (phần home) 
    
    - content:
        - phần band : giới thiệu 
        - phần tour
        - phần contact
        
    - banner (ảnh)
    
    cuối cùng là phần Footer:
    - chứa thông tin liên hệ ....

2/ xây dựng nền
    add folder vào 
    - thêm file index.html (mặc định truy suất ấy mà)
    - tạo folder assets để chứa các file tĩnh (ảnh, .css, .js ...)
    - vào file .html gõ: ! và tab 1 cái :))))
    - sau đó thì phải reset css trong file .css
    - trong .html : đầu tiên tạo 1 div chứa cả dao diện wed là main, sau đó tạo 3 div chứa 3 phần chính như trên

3/ xây dựng chi tiết:
    tuân theo một số quy tắc:
        - làm từ ngoài vào trong (lớp cha đến lớp con)
        - làm từ trên xuống dưới (Header đến Footer)
        - từ tổng quan đến chi tiết
    
    ngoài ra khi làm 1 phần thì cần phải xác định một số thứ:
        - vị trí 
        - kích thước ( width, height)
        - màu sắc
        - kiểu dáng (font chữ, hình dạng(tròn, vuông...) ....)

    a/ main
        hơi đặc biệt một tý do nó chứa cả cái wed
        => kích thước và vị trí = vs wed
            màu sắc: ko cần set màu => trắng
            kiểu dáng: ko có lun

    b/ Header
        - vị trí: nằm ở đầu wed

        - kích thước: width = vs wed
                      height = soi xem = 46px
        - màu sắc: đen

        - kiểu dáng: hình chữ nhật chữ trắng

        sau đó đi vào trong => phần Navigation:

