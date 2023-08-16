// HTML DOM 

/** DOM ( Document Object Model ) : mô hình tài liệu dạng đối tượng
 * - khi một trình duyệt wed (chrome) truy cập vào 1 trang wed thì nó sẽ nhận đc 1 file html.
 *   sau đó chrome dựa vào 1 số quy chuẩn(w3c) và dịch html để chuyển thành mô hình DOM 
 * 
 * - DOM là một mô hình thể hiện được các thông tin về Element, Attribute và text của html(hoặc XML)
 *   dưới dạng cây với gốc là Document.
 * 
 * - DOM được sử dụng với mục đích truy xuất hoặc thao tác cùng tài liệu HTML và XML
 *   trong các ngôn ngữ lập trình thông dụng như: JavaScript, PHP,…
 */

/** DOM HTML
 * thì tương tự trên nhưng chuyên dụng cho html
 * 
 * Chi tiết về cây cấu trúc trong DOM HTML:
 *      - bao gồm các node với gốc là Document
 *      -tiếp theo là các element 
 *          -> attrbute(nếu có)  
 *          -> text(nếu có)
 * vd: 1 file html có head và body:
 * 
 *                              -> <head> (element) -> <title> (element) -> "đây là tiêu đề"(text)
 *  Document -> <html> (element) ->
 *                              -><body> (element) -> <a> (element) -> href="" (attrbute) 
 */

///////////////////////////////////////////////////////////////////////////////

/** truy cập vào:
 * - element: đầu tiên nhớ phải gọi đến gốc cho nhanh:  Document
 *      + id:   getElementById()
 *      + Class:    getElementsByClassName()
 *      + Tag:  getElementsByTagName()
 *      + CSS selector: 
 *          .querySelector()
 *          .querySelectorAll()  
 *      + HTML collection: google đê h ko thích học 
 * 
 * - attrbute: đầu tiên phải gọi đến element muốn truy suất attribute
 *      + đặt attribute cho element:
 *             * bằng toán tử gán '='
 *             * bằng hàm 
 *      + lấy attribute của element:
 *             * bằng hàm 
 *             * bằng '.' thuộc tính
 *      +
 *      
 * - text: đầu tiên phải gọi đến element muốn truy suất text
 *      + get
 *      + set
 *      + InnerText:
 *      + textContent:
 *      
 * 
 */

//Element:

console.log(document.getElementById('id') ); // trả về 1 element
console.log(document.getElementsByClassName('Define')) // trả về 1 HTMLCollection[] chứa nhìu element cùng lớp -> tương tự như mảng
console.log(document.getElementsByTagName('h1') ) // trả về 1 HTMLCollection[] chứa nhìu element cùng tag

console.log(document.querySelector('.Element h3') ) // trả về 1 element đầu tiên nó gặp
console.log(document.querySelectorAll('.Element li') ) // trả về 1 NodeList() chứa nhìu element cùng lớp -> tương tự như mảng


/** set element: đầu tiên phải truy cập đến element mún set
 * InnerHTML 
 * OuterHTML 
 */

var cElement0 = document.querySelector('.Element .newElement');

cElement0.innerText = '<h1>thẻ h1 mới<h1/>' // tuy nhiên nó ko thể thêm mới => ko sài đc
// InnerHTML truy cập tới phần html bên trong element đc truy suất đến
cElement0.innerHTML ='<h2>thẻ h2 mới<h2/>'; // set thêm đc element/ attribute/ text vào (nếu ko có thẻ thì nó xem như <!---->)

console.log(cElement0.innerHTML) // get đc NỘI DUNG HTML


// OuterHTML truy cập tới chính element đc truy suất đến
var cElement01 = document.querySelector('.Element .newElement h3');
cElement01.outerHTML ='<h2>thẻ h2 mới<h2/>'; // set thêm đc element/ attribute/ text vào (nếu ko có thẻ thì nó xem như <!---->)

console.log(cElement01.outerHTML) // get đc NỘI DUNG HTML





// attrbute:
/** đặt attribute cho element:
 * đầu tiên phải truy cập đến element chứa nó
 * sau đó mới mún làm gì làm
 * */
 var cElement1 = document.querySelector('.Attribute h3'); // element

 cElement1.title = 'attribute title' // bằng toán tử gán '='
// tất nhiên attribute đc gán phải phù hợp vs element của nó nếu ko thì ko gán đc

// tuy nhiên trong thực tế thì ta lại muốn có thể đặt một vài attribute tự tạo => sài hàm
 cElement1.setAttribute('custom_attribute','content attribute'); // với đối số 1 là tên , 2 là nội dung



 /** lấy attribute của element:
  * tất nhiên đầu tiên vẫn phải truy cập đến element chứa nó
  * => sài lại cái cũ thui
  */
 var ContentDi = cElement1.title // bằng '.' thuộc tính. chỉ có thể lấy đc những attribute hợp lệ thôi
 var ContentFunc = cElement1.getAttribute('custom_attribute'); // bằng hàm. nhưng có thể lấy đc các value tùy chỉnh luôn
 // => thường thì sài set/getAttribute cho linh hoạt



 // text
 // tương tự trên thôi
 /** có 2 loại text:
  * cả 2 đều có tác dụng là sẽ bỏ qua các thẻ html <> và suất ra nội dung còn lại
  * 
  *     - InnerText: bê nhưng có chuyển đổi
  *         + lấy ra những gì mà ta nhìn thấy trên TRÌNH DUYỆT WED 
  *         => nó sẽ bỏ qua những dấu enter xuống dòng, những dòng style css chỉ in ra text thôi
  * 
  *         + khi set text thông qua InnerText thì nó sẽ gán tất cả những text mà ta nhìn thấy trong nội dung gán
  *         => nó sẽ không bỏ qua những dấu enter xuống dòng (thay = <br>), những dòng style css và nhập vô tất
  * 
  *     - textContent: bê y nguyên
  *         + lấy ra những text có trong element
  *         => nó sẽ không bỏ qua những dấu enter xuống dòng, những dòng style css và in ra tất
  * 
  *         + khi set text thông qua textContent thì nó sẽ gán y nguyên phần text đc nhập
  *         => css ko hỉu và sẽ bỏ qua những dấu enter xuống dòng
  *         **những dòng style css in ra sẽ là text thôi
  */

 var cElement2 = document.querySelector('.Text h3');
 var cElement3 = document.querySelector('.Text li'); // lấy li đầu 

 console.log(cElement2.innerText); // get bằng innerText
 console.log(cElement3.textContent); // get bằng textContent

 cElement2.innerText = `
    
    đây là tiêu đề mới

    các cách truy suất Text
    

 ` // sẽ set vào sao cho khi in ra sẽ nhìn đc như v trên wed
 console.log(cElement2.innerText);

 cElement3.textContent = `
 
    hahahhhahhaha
    hahahahhahaha   

 
 ` // sẽ set vào sao cho khi in ra sẽ nhìn đc như v trên console
 console.log(cElement3.textContent);


// cElement2.textContent = 'new text'



