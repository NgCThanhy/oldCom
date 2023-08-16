
// các yếu tố cơ bản của javascript

/* biến - variable 
* cú pháp: var <tên biến> = <giá trị biến>; (biến toàn cục)
*          let <tên biến> = <giá trị biến>; (biến cục bộ trong {})
*          const <tên biến> = <giá trị biến>; (hằng số)
*/
 var FullName = 'Nguyễn Chí Thành' ;
alert (FullName) ;


/** kiểu dữ liệu boolean:
 *  các giá trị sau sẽ được mặc định hiểu là false: (hay còn gọi là falsy)
 * - false
 * - 0
 * - '' hoặc ""
 * - undefined
 * - NaN
 * - null
 * 
 * còn lại thì luôn true
*/

/**kiểu dữ liệu thuộc Object type:
 * - Object:
 *      giống kiểu json á
 * - array:
 *      uầy như cũ đc bao bởi dấu []
*/
/**Object
 * sẽ đc bao bởi dấu {}
 * một phần tử bao gồm một cặp key và value cách nhau bằng dấu :
 * cách nhau giữa các phần tử là dấu ,
*/
var MyObject = {
    name: 'Nguyễn Chí Thành',
    age: 22
}


/**trong js còn có toán tử so sánh tuyệt đối:
 * - ===
 * - !==
*/
var  a = 1, b = '1';
var c = a == b; //true ???? => nó ko so sánh kiểu dữ liệu
var d = a === b; // false => so sánh luôn 


/** ngoài ra chỉ riêng js cách hoạt động của toán tử so sánh && và || hoạt động hơi khác
 * - && sẽ ko trả về kiểu boolean mà nó sẽ:
 *      + xét từ trái sang phải
 *      + && sẽ trả về giá trị falsy đầu tiên nó gặp 
 *      => nếu ko có falsy thì lấy giá trị cuối
 *      vd: a && b && 0 && d => trả về 0
 * - || ngược lại với && sẽ trả về giá trị KHÔNG phải falsy đầu tiên mà nó gặp
 *      vd: a && b && 0 && d => trả về a
*/




/** hàm Built-in
 * là một số hàm đc js xây dựng sẵn và chỉ cần gọi và sử dụng:
 * 1. Alert
 * 2. Console
 * 3. Confirm
 * 4. Prompt
 * 5. Set timeout
 * 6. Set interval
 */

/** Alert
 * là hàm giúp hiện những gì chứa trong đó như một thông báo trên đầu wed khi trình duyệt mở wed
 * sau khi nhấn nút đồng ý thì tự tắt
 * hàm nào có trước thì mở trước và sau khi tắt thì sẽ hiện hàm Alert kế tiếp.
*/
alert (22) ;


/** Console
 * có chứa nhiều hàm nhỏ bên trong có tác dụng hiển thị trên tag console của trình duyệt wed
 * => có nhìu nhưng cơ bản chỉ cần quan tâm 3 cái
 * à nếu có lỗi thì ko chạy nữa
*/
// console.alert('cũng như log như đc xem như là 1 cảnh báo');
// console.error(' như trên nhưng được xem là lỗi');
console.log('in ra trên tag console: ', FullName);
// hoặc có thể nối chuỗi bằng dấu +:
console.log('nối bằng dấu +' + FullName + ' sẽ ko tính các phần tử nằm ngoài dấu \'\'')
// hoặc có thể nối chuỗi bằng template string ES6:
console.log(`nối bằng template string ES6: ${FullName} thì ko cần phải lo về các phần tử nằm ngoài`)


/** Confirm
 * tương tự như hàm Alert nhưng lại đưa ra 2 lựa chọn ok hay ko
*/
confirm('bạn có đủ tuổi??');

/** Prompt
 * tương tự như hàm Confirm nhưng lại có thêm thanh nhập liệu
*/
prompt('nhập tuổi bạn đê');


/** Set timeout
 * cho chạy 1 đoạn code (function) sau 1 khoảng thời gian
 * cú pháp: 
        setTimeout(
            function() {<để các code vào đây>},
            <khoảng time theo ms>
        );
*/
setTimeout(
    alert('set time chạy sau 2s'), //về cơ bản thì cái này cũng là 1 function
    2000 // chạy sau 2s
);


/** Set interval
 * tương tự setTimeout như thay vì chạy sau 1 khoảng thời gian thì nó lại chạy
 * liên tục cách nhau 1 khoảng thời gian
 * 
 * cú pháp:
        setInterval(
            function() {},
            1000
        ); 
*/


/** Hàm (functions) trong js
 * 
 * hàm là một khối mã có thể nhận tham số và trả về giá trị
 * 
 * có 3 loại hàm
 * 1/ Declaration Function
 *      cú pháp:
 *      function <tên hàm>(<tham số>) {
 *           <khối lệnh>
 *      }
 * 
 * 2/ Expression Function (anonymous function) hàm ko tên
 * thường thì nó sẽ đc gán vào 1 biến hoặc xem như tham số đưa vào 
 *      cú pháp:
 *      var run = function(<tham số>) {
 *           <khối lệnh>
 *      }
 * và tất nhiên hàm chỉ chạy khi biến của nó đc gọi đến
 * 
 * 3/ Arrow Function
 * Đây là loại function được thêm vào từ phiên bản ES6 và hình như nó tương đương với hàm lamda thì phải.
 *      cú pháp:
 *      var run = (<tham số>) => {
 *           <khối lệnh>
 *              nếu có tham số thì nhớ return
 *      } 
 */

// thử xây dựng 1 hàm nhận vào vô số tham số (sài Arguments)
function WriteLog() { 
    console.log(arguments); // sẽ trả về 1 mảng chứa tất cả các tham số truyền vào
}


/** ngoài ra việc chạy code trong js ko bình thường cho lắm
 * nó ko chạy từ trên xuống mà chạy theo cơ chế Hoisting 
 * 
 * Hoisting là việc khi compile javascript sẽ đưa các declarations lên trên đầu scope.
 * theo mức độ ưu tiên là function -> var
 * và js lại có cơ chế ghi đè với các hàm - biến cùng tên => cẩn thận cái Hoisting
 * 
*/

//////////////////////////
//vd
console.log(x1);
var x1 = 1;
// trong code ta thấy x1 chưa được khai báo trước khi đưa vào hàm
// => đáng lẽ phải báo lỗi
// tuy nhiên nó lại ko lỗi mà ra kết quả: undefined

//=> thực tế thì:
/*trình biên dịch sẽ hiểu như v

var x1; // hoisting
console.log(x1); // output -> undefined
var x1 = 1; // Initializations

*/
// nó sẽ đẩy phần khai báo (declarations) lên đầu của khối code và gán mặc định là undefined
//=> code vẫn chạy ok
////////////////////////////

// và tất nhiên cái này cũng có gây ra 1 số lỗi:
// vd:
/*
var x5 = 2;
function x5() {
    console.log('x5 is function');
}
x5(); // nhớ là gọi mới chạy nhá
*/

//cứ tưởng nó sẽ in ra 'x5 is function' nhưng ko nó sẽ báo lỗi: TypeError: x5 is not a function 
/* do trong thực tế thì:

function x5() {
    console.log('x5 is function');
}
var x5;
var x5 = 2; 
x5();

*/

// như trên thì cái var x5 đã ghi đè lại x5 thành biến => viết x5() là sai cú pháp
// => sửa lại:
/*

x5();
var x5 = 2;
function x5() {
    console.log('x5 is function');
}

*/