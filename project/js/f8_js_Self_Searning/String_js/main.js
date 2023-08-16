// về cơ bản thì js cũng là java nên qua java xem lại đê

/**
 * 1/ length
 * 2/ find index
 * 3/ cut string
 * 4/ replace
 * 5/ in hoa/ thường
 * 6/ trim
 * 7/ split
 * 8/ get char by index
 * 
*/
var Mystring = 'Nguyễn Chí Thành';

// 1 length
console.log(Mystring.length); // in ra độ dài (bao gồm cả dấu cách)


// 2 find index: tìm vị trí của 1 ký tự
console.log(Mystring.indexOf('h')); // trả về vị trí của 'h' đầu tiên
console.log(Mystring.indexOf('z')); // ko có thì trả về -1
console.log(Mystring.indexOf('h',9)); // trả về vị trí của 'h' bắt đầu từ index 9
console.log(Mystring.lastIndexOf('h')); // trả về vị trí cuối cùng của 'h'

// * includes() tìm xem 1 trong 1 chuỗi có 1 giá trị gì hay ko:
console.log(Mystring.includes('chí')) // --> true


// 3 cut string: cắt chuỗi (substring trong java á)
console.log(Mystring.slice(7,10)); // cắt chuỗi từ index 7 - 10
console.log(Mystring.slice(7)); // cắt chuỗi từ index 7 đến hết
console.log(Mystring.slice(-5, 0)); // cắt từ phải sang trái (thành)


// 4 replace: thay thế chuỗi
console.log(Mystring.replace('Thành','phèo')); // thay thế 'thành' đầu tiên thành 'phèo'
console.log(Mystring.replace(/Thành/g,'phèo')); // sử dụng biểu thức chính quy để thay thế tất cả 'thành' thành 'phèo'


// 5 in hoa - thường
console.log(Mystring.toUpperCase()); // in hoa
console.log(Mystring.toLowerCase()); // in thường


// 6 trim: loại bỏ khoảng trắng ở 2 đầu 
console.log(Mystring.trim()); // xóa khoảng trắng 2 ĐẦU => giảm kích thước nếu có khoảng trắng


// 7 split: chuyển chuỗi thành mảng
console.log(Mystring.split(' ')); // xem chuỗi trên thì giữa các phần tử muốn tách là dấu cách ' ' => cho vào split
console.log(Mystring.split('')); // nếu truyền vào chuỗi rỗng thì nó sẽ cắt từng chữ thành phần tử của array

// 8 get char by index: 
console.log(Mystring.charAt(8)); // trả về ký tự tại index 8
console.log(Mystring.charAt(100)); // nếu index ko có trong chuỗi => trả về chuỗi rỗng



///////////////////////////////////////////////////////////

//                                        regular expressions

/** regular expressions
 * - là các mẫu dùng để tìm kiếm các bộ kí tự được kết hợp với nhau trong các chuỗi kí tự
 * - trong JavaScript thì biểu thức chính quy cũng đồng thời là các đối tượng,
 *      tức là khi bạn tạo ra một biểu thức chính quy là bạn có một đối tượng tương ứng.
 * 
*/

// tạo 1 mẫu biểu thức chính quy gồm một tập các kí tự thường, như /abc/,
// hay một tập kết hợp cả kí tự thường và kí tự đặc biệt như /ab*c/ hoặc /Chapter (\d+).\d*/
//vd:
var re = /ab+c/; 


var REstring = 'abcdef abcdef aaaaa';
// sử dụng mẫu biểu thức chính quy đơn giản
console.log(REstring.replace(/abc/g,'hahaha'));